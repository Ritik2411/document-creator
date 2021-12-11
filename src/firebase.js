import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth,GoogleAuthProvider } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB76aUZS6EmIXS8TLSdistglEQfR9CBfQE",
    authDomain: "document-creator-22c28.firebaseapp.com",
    projectId: "document-creator-22c28",
    storageBucket: "document-creator-22c28.appspot.com",
    messagingSenderId: "82801116337",
    appId: "1:82801116337:web:0db0cf2264deb1c87f8e90",
    measurementId: "G-PB6CVHXDHD"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()
const db = getFirestore()

export {auth,provider}
export default db