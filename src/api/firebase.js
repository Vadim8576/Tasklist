import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)

export const fb = {
  singIn: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  },

  logOut: () => {
    return signOut(auth)
  },

  snapshot: async (payload) => {
    const {setTaskList, userId} = payload


    if(!userId) return


    const citiesRef = collection(db, "cities");

    // await setDoc(doc(citiesRef, "SF"), {
    //     name: "San Francisco",
    //     state: "CA",
    //     country: "USA",
    //     capital: false,
    //     population: 860000,
    //     regions: ["west_coast", "norcal"]
    //   });

    // await setDoc(doc(citiesRef, "LA"), {
    //     name: "Los Angeles", state: "CA", country: "USA",
    //     capital: false, population: 3900000,
    //     regions: ["west_coast", "socal"] });
    // await setDoc(doc(citiesRef, "DC"), {
    //     name: "Washington D.C.", state: null, country: "USA",
    //     capital: true, population: 680000,
    //     regions: ["east_coast"] });
    // await setDoc(doc(citiesRef, "TOK"), {
    //     name: "Tokyo", state: null, country: "Japan",
    //     capital: true, population: 9000000,
    //     regions: ["kanto", "honshu"] });
    // await setDoc(doc(citiesRef, "BJ"), {
    //     name: "Beijing", state: null, country: "China",
    //     capital: true, population: 21500000,
    //     regions: ["jingjinji", "hebei"] });



      const q = query(collection(db, "cities"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
        });
        setTaskList(cities)
        // console.log("Current cities in CA: ", cities.join(", "));
      });

    



    // console.log('firebase ID',userId)


  },

  addTask: async (payload) => {
    const {userId, title, comment} = payload
    console.log('Press Add')
    console.log('firebase/addTask = ', userId)

    await setDoc(doc(db, userId, title), {
      'complite': false,
      'task': 'Следующая задача',
      'createdAt': Timestamp.now().seconds
    })
  }
}

// export const auth = getAuth();
// export const db = getFirestore(app);


// export const singIn = (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password)
// }

// export const logout = () => {
//   return signOut(auth)
// }


// export const snapshot = () =>{
  
// }


// export const addTask = async (userId) => {

//   console.log('Press Add')

//   await setDoc(doc(db, userId, '6'), {
//     'complite': false,
//     'task': 'Следующая задача',
//     'createdAt': Timestamp.now().seconds
//   })



// }




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
// export const toggleTaskComplite = () => {
//   const db = getDatabase();
//   const postRef = ref(db, '/todolist/');

//   runTransaction(postRef, (item) => {
//     if (!item.complite) {
//       item.complite = true;
//     }
//     return item;
//   });
// }