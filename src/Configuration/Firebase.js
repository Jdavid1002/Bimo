import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/storage'

const confi = {
    apiKey: "AIzaSyA5Pbi40MTGUT2hTg8XoefJnCP77442xeI",
    authDomain: "ecommerce-6c871.firebaseapp.com",
    projectId: "ecommerce-6c871",
    storageBucket: "ecommerce-6c871.appspot.com",
    messagingSenderId: "806764567379",
    appId: "1:806764567379:web:ed762f6d5fc6cd62421fa6"
}

const fb = firebase.initializeApp(confi);

const db = {
  Config : confi,
  firestore : fb.firestore(),
  storageRef : fb.storage
}

export default db