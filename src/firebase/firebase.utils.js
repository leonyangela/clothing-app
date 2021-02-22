import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBrIUFmC7wnmtatiELucubPxnJ7QZ6Q1NQ',
  authDomain: 'clothing-app-43a2a.firebaseapp.com',
  projectId: 'clothing-app-43a2a',
  storageBucket: 'clothing-app-43a2a.appspot.com',
  messagingSenderId: '593925974757',
  appId: '1:593925974757:web:cd5b9d969f86be1394420c',
  measurementId: 'G-27HB3NBPGW',
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
