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

  createMainList: async (userId) => {

    const mainTaskListRef = collection(db, userId);

    await setDoc(doc(mainTaskListRef, 'Список покупок продовольствия'), {   
      createAt: 165654654654646,
      subTask: [
        {
          createAt: 165654654654646,
          title: 'Хлеб',
          complited: false,
          comments: 'Черный хлеб'
        },
        {
          createAt: 1623454654654645,
          title: 'Молоко',
          complited: false,
          comments: 'вологодское'
        },
        {
          createAt: 1623454654654545,
          title: 'Масло',
          complited: false,
          comments: 'вологодское'
        }
      ]
    })

    await setDoc(doc(mainTaskListRef, 'Список покупок инструментов'), {   
      createAt: 165654654654222,
      subTask: [
        {
          createAt: 165654654654646,
          title: 'Отвертка',
          complited: false,
          comments: 'крестовая'
        },
        {
          createAt: 1623454654654645,
          title: 'пила',
          complited: false,
          comments: 'дружба'
        },
        {
          createAt: 1623454654654645,
          title: 'Топор',
          complited: false,
          comments: 'Колун'
        }
      ]
      
    });
    
  },

  mainTaskListSnapshot: function (payload) {
    const {setTaskList, userId} = payload

    if(!userId) return

    // await this.createMainList(userId)

    
    const q = query(collection(db, userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allDocs = []
      querySnapshot.forEach((doc) => {
        allDocs.push({
          title: doc.id,
          createAt: doc.data().createAt,
          subTask: doc.data().subTask
        })
      });
      setTaskList(allDocs)
    });
      

  },

  subTaskListSnapshot: async function (payload) {
    const {setTaskList, userId} = payload

    if(!userId) return
      const unsub = onSnapshot(doc(db, "mainTaskList", userId), (doc) => {
        console.log("Current data: ", doc.data());
        console.log("Current data: ", doc.data().mainTask);
        setTaskList(doc.data().mainTask)
    });

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