import { all } from "deepmerge";
import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp,
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs,
  getFirestore,
  onSnapshot, 
  query, 
  setDoc, 
  updateDoc, 
  where
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const DB_NAME = 'list';

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

  createNewDB: (userId) => {

    // const data = {   
    //   title: 'Список задач4',
    //   createAt: 165654654654646,
    //   creatorId: userId,
    //   usersIDs: [],
    //   subTasks: [
    //     {
    //       createAt: 165654654654646,
    //       title: 'лом',
    //       complited: false,
    //       comments: 'Черный хлеб'
    //     },
    //     {
    //       createAt: 1623454654654645,
    //       title: 'топор',
    //       complited: false,
    //       comments: 'вологодское'
    //     },
    //     {
    //       createAt: 1623454654654545,
    //       title: 'дрель',
    //       complited: false,
    //       comments: 'вологодское'
    //     }
    //   ]
    // }
    const data = {   
      title: 'Список задач4',
      createAt: 165654654654646,
      creatorId: userId,
      usersIDs: [],
      subTasks: []
    }

    const collectionRef = collection(db, DB_NAME)
    const newDocRef = doc(collectionRef)
       

    setDoc(newDocRef, data)
      .then(() => {
        console.log('Документ успешно добавлен в коллекцию.');
            
        const docId = newDocRef.id;
        console.log('docId = ', docId)
        const updatedData = { ...data, mainTaskId: docId};
    
        setDoc(newDocRef, updatedData)
          .then(() => {
            console.log('ID успешно добавлен в данные документа.');
          })
          .catch((error) => {
            console.error('Ошибка при добавлении ID в данные документа:', error);
          })
      })
      .catch((error) => {
        console.error('Ошибка при добавлении документа:', error);
      })  
  },

  taskSnapshot: function (payload) {
    const {setMainTaskList, userId} = payload

    if(!userId) return

    // await this.deleteAllDocuments()
    // this.createNewDB(userId)

    
    const q = query(collection(db, DB_NAME), where('creatorId', '==', userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allDocs = []
      querySnapshot.forEach((doc) => {
        allDocs.push({
          mainTaskId: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          subTasks: doc.data().subTasks,
          creatorId: doc.data().creatorId
        })
      })
      
      // console.log('allDocs = ', allDocs)
      setMainTaskList(allDocs)
    })
   

    return unsubscribe  
  },


  addTaskList: (payload) => {
    const {userId, title} = payload
    console.log('Press Add')

    const data = {   
      title: title,
      createdAt: Timestamp.now().seconds,
      creatorId: userId,
      usersIDs: [],
      subTasks: []
    }

    const collectionRef = collection(db, DB_NAME)
    const newDocRef = doc(collectionRef)
       

    setDoc(newDocRef, data)
      .then(() => {
        console.log('Документ успешно добавлен в коллекцию.');
            
        const docId = newDocRef.id;
        console.log('docId = ', docId)
        const updatedData = { ...data, mainTaskId: docId};
    
        setDoc(newDocRef, updatedData)
          .then(() => {
            console.log('ID успешно добавлен в данные документа.');
          })
          .catch((error) => {
            console.error('Ошибка при добавлении ID в данные документа:', error);
          })
      })
      .catch((error) => {
        console.error('Ошибка при добавлении документа:', error);
      })  
  },

  updateTaskList: (payload) => {
    const { title, mainTaskId} = payload
    if(!mainTaskId) return


    const docRef = doc(db, DB_NAME, mainTaskId);

    updateDoc(docRef, {
      title: title
    })
    .then((doc) => {
      console.log('Список задач успешно обновлен')
    })
    .catch((error) => {
      console.log('Ошибка обновления названия списка задач', error)
    })

  },

  removeMainTask: async (mainTaskId) => {
    await deleteDoc(doc(db, DB_NAME, mainTaskId))
  },
  


  addSubTask: (payload) => {
    const {title, comment, mainTaskId} = payload
    console.log(title, comment, mainTaskId)

    if(!mainTaskId) return

    const docRef = doc(db, DB_NAME, mainTaskId);

    getDoc(docRef)
    .then((doc) => {
      const subTasks = doc.data().subTasks

      updateDoc(docRef, {
        subTasks: [
          ...subTasks,
          {
            title: title,
            comment: comment,
            complited: false
          } 
        ]
      })
      .then(() => {
        console.log('Таска успешно добавлена')
      })
      .catch((error) => {
        console.log('Ошибка добавления таски: ', error)
      })
    })
    .catch((error) => {
      console.log('Ошибка получения документа для обновления', error)
    })

  },


  updateSubTask: (payload) => {
    const {taskIndex, title, comment, complited = null, mainTaskId} = payload
    if(!mainTaskId) return

    const docRef = doc(db, DB_NAME, mainTaskId);

    getDoc(docRef)
    .then((doc) => {
      const subTasks = doc.data().subTasks

      subTasks[taskIndex] = {
        ...subTasks[taskIndex],
        complited: complited != null ? complited : subTasks[taskIndex].complited, 
        title, 
        comment
      }

      updateDoc(docRef, { 
        subTasks: [
          ...subTasks
        ]
      })
      .then(() => {
        console.log('Таска успешно обновлена')
      })
      .catch((error) => {
        console.log('Ошибка обновления таски: ', error)
      })
    })
    .catch((error) => {
      console.log('Ошибка получения документа для обновления', error)
    })

  },

  removeSubTask: (payload) => {
    const {taskIndex,  mainTaskId} = payload

    console.log(taskIndex,  mainTaskId)

    if(!mainTaskId) return



    const docRef = doc(db, DB_NAME, mainTaskId);

    getDoc(docRef)
    .then((doc) => {
      const subTasks = doc.data().subTasks

      const newSubTasks = subTasks.filter((_, index) => index !== taskIndex)

      updateDoc(docRef, { 
        subTasks: [
          ...newSubTasks
        ]
      })
      .then(() => {
        console.log('Таска успешно обновлена')
      })
      .catch((error) => {
        console.log('Ошибка обновления таски: ', error)
      })
    })
    .catch((error) => {
      console.log('Ошибка получения документа для обновления', error)
    })

  },


  removeAllTaskList: async () => {

    const collectionRef = collection(db, DB_NAME);
    const docs = await getDocs(collectionRef);
  
    docs.forEach((doc) => {
      deleteDoc(doc.ref)
        .then(() => {
          console.log(`Документ ${doc.id} успешно удален`);
        })
        .catch((error) => {
          console.error(`Ошибка при удалении документа ${doc.id}:`, error);
        });
    });
  },


  // deleteAllTasks: async () => {

  //   const collectionRef = collection(db, DB_NAME);
  //   const docs = await getDocs(collectionRef);
  
  //   docs.forEach((doc) => {
  //     deleteDoc(doc.ref)
  //       .then(() => {
  //         console.log(`Документ ${doc.id} успешно удален`);
  //       })
  //       .catch((error) => {
  //         console.error(`Ошибка при удалении документа ${doc.id}:`, error);
  //       });
  //   });
  // }



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