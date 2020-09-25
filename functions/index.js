const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { default: algoliasearch } = require('algoliasearch');
admin.initializeApp();

const algoliaClient = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
const collectionIndexName = 'dev_POEMS';
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

exports.sendCollectionToAlgolia = functions.runWith({
  timeoutSeconds: 60,
  memory: '512MB'
}).https.onRequest((req, res) => {
  const algoliaRecords = [];

  const ref = admin.database().ref('poems');
  ref.once("value", (snapshot) => {
    snapshot.forEach((item) => {
      const p = item.val();
      console.log('Indexing...', JSON.stringify(p));
      algoliaRecords.push({
        objectID: item.key,
        title: p.title,
        author: p.author,
        instagram: p.instagram,
        twitter: p.twitter,
        website: p.website,
        content: p.paragraphs
      });
    });

    collectionIndex.saveObjects(algoliaRecords, { autoGenerateObjectIDIfNotExist: true }).then(() => {
      res.status(200).send("Poems was indexed to Algolia successfully.");
      return null;
    }).catch((e) => { console.error(e); res.status(500) });
  });
})

const getRandomPoem = (data) => {
  const poemas = [];

  data.forEach((item) => {
    var poema = item.val();
    poema['id'] = item.key;
    poemas.push(poema);
  });

  const pos = Math.floor(Math.random() * poemas.length - 1) + 1;
  const randomPoem = poemas[pos];
  const posParagraph = Math.floor(Math.random() * randomPoem.paragraphs.length - 1) + 1;
  const randomText = randomPoem.paragraphs[posParagraph];
  const fullText = randomPoem.paragraphs.map((elem) => {
    return elem.text;
  }).join("<br><br>");

  let poem = {
    id: randomPoem.id,
    text: randomText.text,
    fullText: fullText,
    paragraphs: randomPoem.paragraphs,
    author: randomPoem.author,
    title: randomPoem.title
  };

  if (randomPoem.website) { poem['website']  = randomPoem.website; }
  if (randomPoem.twitter) { poem['twitter']  = randomPoem.twitter; }
  if (randomPoem.instagram) { poem['instagram']  = randomPoem.instagram; }

  return poem;
}

exports.random = functions.runWith({
  timeoutSeconds: 30,
  memory: '512MB'
}).https.onRequest((request, response) => {
  const allowedOrigins = ['http://localhost:3000', 'https://poemasmaker.web.app'];
  const origin = request.headers.origin;
  if (allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
  const onlyText = request.query.text;

  const root = admin.database().ref('poems');
  root.once("value", (snapshot) => {
    const poem = getRandomPoem(snapshot);
    if (onlyText) {
      response.send(poem.text);
    } else {
      response.send(poem);
    }
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
    res.status(500).send('Algo salió mal!');
  });
});

exports.poemOftheDayGenerator = functions.runWith({
  timeoutSeconds: 30,
  memory: '128MB'
}).pubsub.schedule('every day 00:00').timeZone('America/Buenos_Aires').onRun((context) => {
  const ref = admin.database().ref('poemOfTheDay');
  ref.once("value", (snapshot) => {
    const poemsRef = admin.database().ref('poems');
    poemsRef.once("value", (snapshot) => {
      const poem = getRandomPoem(snapshot);
      poem.createdAt = admin.database.ServerValue.TIMESTAMP;
      console.log('Updating poem of the day');
      ref.set(poem);
    }, (errorObject) => {
      console.log("The read failed: " + errorObject);
    });
  }, (errorObject) => {
    console.log("The read failed: " + errorObject);
  });
  return null;
});

exports.randomTweet = functions.pubsub.schedule('every 3 hours').onRun((context) => {
  let Twit = require('twit'),
    config = {
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

  const root = admin.database().ref('poems');
  root.once("value", (snapshot) => {
    const poem = getRandomPoem(snapshot);
    let tw = poem.text;
    tw = tw.concat('\n\n').concat(poem.author);
    T.post('statuses/update', { status: tw }, (err, data, response) => {
      if (err) {
        console.log('error!', err);
      }
      else {
        console.log('tweeted', JSON.stringify(tw));
      }
    });
  });
  return null;
});

exports.createIndex = functions.database.ref('/poems/{pushID}').onCreate((snap) => {
  const item = snap.val();
  collectionIndex.saveObject({
    objectID: snap.key,
    author: item.author,
    title: item.title,
    instagram: item.instagram,
    twitter: item.twitter,
    website: item.website,
    content: item.paragraphs
  }, { autoGenerateObjectIDIfNotExist: true })
  .then(() => {
    console.log('Firebase object indexed in Algolia', record.objectID);
    return null;
  })
  .catch(error => {
    console.error('Error when indexing poem into Algolia', error);
    return null;
  });
  return null;
});

exports.updateIndex = functions.database.ref('/poems/{pushId}').onUpdate((change, context) => {
  const newData = change.after.val();
  const poem = {
    objectID: context.params.pushId,
    title: newData.title,
    author: newData.author,
    instagram: newData.instagram,
    twitter: newData.twitter,
    website: newData.website,
    content: newData.paragraphs
  }
  console.log('Updating index', JSON.stringify(poem));
  collectionIndex.saveObject(poem).then(() => {
    console.log('Index updated!');
    return;
  }).catch((e) => { console.error(e); res.status(500) });
  return null;
});

exports.deleteIndex = functions.database.ref('/poems/{pushId}').onDelete((snapshot, context) => {
  collectionIndex.deleteObject(context.params.pushId)
  console.log('Deleted index', context.params.pushId);
  return null;
});

exports.createUser = functions.auth.user().onCreate((user) => {
  admin.database().ref('users').child(user.uid).set({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      description: "",
      createdAt: user.metadata.creationTime,
      favorites: {}
  });
  return null;
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
  admin.database().ref('users').child(user.uid).remove();
  return null;
});

exports.contact = functions.runWith({ timeoutSeconds: 15, memory: '128MB'}).https.onRequest(async (request, response) => {
  const allowedOrigins = ['http://localhost:3000', 'https://poemasmaker.web.app'];
  const origin = request.headers.origin;
  if (allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    const nombre = request.body.nombre;
    const email = request.body.email;
    const comentario = request.body.comentario;
    try {
      if (nombre.length > 50) {throw (new Error('Invalid Data'))}
      if (email.length > 200) {throw (new Error('Invalid Data'))}
      if (comentario.length > 500) {throw (new Error('Invalid Data'))}
      await admin.database().ref().child('comments').push().set({
        nombre: nombre,
        email: email,
        comentario: comentario,
        createdAt: admin.database.ServerValue.TIMESTAMP
      });
      response.status(200).end();
    } catch(e) {
      console.error(e);
      response.status(500).end();
    }
  }
  return null;
});