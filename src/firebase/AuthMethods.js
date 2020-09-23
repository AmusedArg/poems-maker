import firebase from 'firebase/app';

export const authMethods = {
  register: async (email, password, setError, setUser) => {
    try {
      setError(null);
      firebase.auth().languageCode = 'es';
      const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if(data.user && data.user.emailVerified === false){
        await data.user.sendEmailVerification();
        setUser(data.user);
          Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
      }
    } catch(e) {
      setError(e.code);
    }
  },
  login: async (email, password, setError, setUser) => {
    try {
      setError(null);
      const data = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(data.user);
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
    } catch(e) {
      setError(e.code);
    }
  },
  logout: async () => {
    firebase.auth().signOut();
  },
  isUserValid: () => {
    let user = firebase.auth().currentUser;
    return (user && user.emailVerified)
  }
}
