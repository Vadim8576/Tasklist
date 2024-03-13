import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, getFirestore, setDoc } from "firebase/firestore";
import { getDatabase, ref, set, push } from "firebase/database";
import { Alert } from "react-native";


const firebaseConfig = {
  apiKey: "AIzaSyBRrxg7pEd6qdk50OfvmtIvoy5i3vj5FSY",
  authDomain: "sber-ad533.firebaseapp.com",
  projectId: "sber-ad533",
  storageBucket: "sber-ad533.appspot.com",
  messagingSenderId: "1018301797212",
  appId: "1:1018301797212:web:a4faa1cbdb5b87f7892799"
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