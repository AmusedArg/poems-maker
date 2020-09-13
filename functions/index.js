const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const getRandomPoem = (data) => {
    const poemas = [];

    data.forEach((item) => {
        var poema = item.val();
        poemas.push(poema);
    }); 

    const pos = Math.floor(Math.random() * poemas.length-1) + 1;
    const randomPoem = poemas[pos];
    const posParagraph = Math.floor(Math.random() * randomPoem.paragraphs.length-1) + 1;
    const randomText = randomPoem.paragraphs[posParagraph];
    const fullText = randomPoem.paragraphs.map((elem) => {
        return elem.text;
    }).join("<br><br>");

    return {
        text: randomText.text,
        fullText: fullText,
        paragraphs: randomPoem.paragraphs,
        author: randomPoem.author,
        title: randomPoem.title
    };
}

exports.random = functions.https.onRequest((request, response) => {
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

exports.poemOftheDayGenerator = functions.pubsub.schedule('every day 00:00').onRun((context) => {    
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

exports.randomTweet = functions.pubsub.schedule('every 1 hours').onRun((context) => {
    Twit = require( 'twit' ),
      config = {
        twitter: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
          access_token: process.env.ACCESS_TOKEN,
          access_token_secret: process.env.ACCESS_TOKEN_SECRET
        }
      },
      T = new Twit( config.twitter );

    const root = admin.database().ref('poems');
    root.once("value", (snapshot) => {
        const tw = getRandomPoem(snapshot).text;
        T.post('statuses/update', { status: tw }, ( err, data, response )  => {
            if ( err ){
              console.log('error!', err );
            }
            else {
              console.log('tweeted', JSON.stringify(tw));
            }
        });
    });
    return null;
});