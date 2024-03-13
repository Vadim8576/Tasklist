import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, getFirestore, setDoc } from "firebase/firestore";
import { getDatabase, ref, set, push } from "firebase/database";
import { Alert } from "react-native";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};




const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// разобраться с регистрацией
// const provider = new GoogleAuthProvider();
// export const createUser = (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password)
// }

export const singIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return signOut(auth)
}

export const addTask = async (userId) => {

  console.log('Press Add')

  await setDoc(doc(db, userId, '6'), {
    'complite': false,
    'task': 'Следующая задача',
    'createdAt': Timestamp.now().seconds
  })



}




// export const readData = () => {
//   const db = getDatabase();
//   const list = ref(db, 'todolist');
//   return onValue(list, (snapshot) => {
//     const data = snapshot.val();
//     console.log('firebase.js', data)
//     return data
//   });
// }




// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }






// транзакция, используется для совместного изменения данных
// https://firebase.google.com/docs/database/web/read-and-write?hl=ru
export const toggleTaskComplite = () => {
  const db = getDatabase();
  const postRef = ref(db, '/todolist/');

  runTransaction(postRef, (item) => {
    if (!item.complite) {
      item.complite = true;
    }
    return item;
  });
}