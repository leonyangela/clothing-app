import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBTp8EmEsjT2lNppRt63Z1r-QL5OGckdbA",
  authDomain: "clothing-app-779e5.firebaseapp.com",
  projectId: "clothing-app-779e5",
  storageBucket: "clothing-app-779e5.appspot.com",
  messagingSenderId: "125434203298",
  appId: "1:125434203298:web:ab8ce48e5a7cfb118c5bfb",
  measurementId: "G-X56MZ8G6F2"
};

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase