
import { initializeApp } from 'firebase/app';

import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Timestamp,
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
} from 'firebase/firestore';

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


let setErrorMessage
let setSuccessMessage

export const setMessage = (init) => {
  setErrorMessage = init.setErrorMessage
  setSuccessMessage = init.setSuccessMessage
  console.log('setErrorMessage = ', setErrorMessage)
}


export const fb = {
  
  singIn: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  },

  logOut: () => {
    return signOut(auth)
  },

  taskSnapshot: function (payload) {
    const {setTaskList, userId} = payload

    if(!userId) return
    
    const q = query(collection(db, DB_NAME), where('creatorId', '==', userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allDocs = []
      querySnapshot.forEach((doc) => {
        allDocs.push({
          taskListId: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          tasks: doc.data().tasks,
          creatorId: doc.data().creatorId
        })
      })
      
      // console.log('allDocs = ', allDocs)
      setTaskList(allDocs)
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
      tasks: []
    }

    
    const collectionRef = collection(db, DB_NAME)
    const newDocRef = doc(collectionRef)
       
    let firstDocAdded = false;
    setDoc(newDocRef, data)
    .then(() => {
      firstDocAdded = true;
      console.log('Документ успешно добавлен в коллекцию.');
            
      // throw new Error
      const docId = newDocRef.id;
      const updatedData = { ...data, taskListId: docId};

      setDoc(newDocRef, updatedData)
      .then(() => {
        console.log('ID успешно добавлен в данные документа.');
        setSuccessMessage()
      })
      .catch((error) => {
      
        console.error('Ошибка при добавлении ID в данные документа:', error);

        if (firstDocAdded) {
          deleteDoc(newDocRef).then(() => {
            console.log('Первый документ успешно удален.');
          })
          .catch((deleteError) => {
              console.error('Ошибка при удалении первого документа:', deleteError);
          })
        }
      })
    })
    .catch((error) => {
          
      // console.error('Ошибка при добавлении документа:', error);
      setErrorMessage()
    })  
    
  },

  updateTaskList: (payload) => {
    const { title, taskListId} = payload
    if(!taskListId) return


    const docRef = doc(db, DB_NAME, taskListId);

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

  removeTaskList: async (taskListId) => {
    await deleteDoc(doc(db, DB_NAME, taskListId))
  },
  


  addTask: (payload) => {
    const {title, comment, taskListId} = payload
    console.log(title, comment, taskListId)

    if(!taskListId) return

    const docRef = doc(db, DB_NAME, taskListId);

    getDoc(docRef)
    .then((doc) => {
      const tasks = doc.data().tasks

      updateDoc(docRef, {
        tasks: [
          ...tasks,
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


  updateTask: (payload) => {
    const {taskIndex, title, comment, complited = null, taskListId} = payload
    if(!taskListId) return

    const docRef = doc(db, DB_NAME, taskListId);

    getDoc(docRef)
    .then((doc) => {
      const tasks = doc.data().tasks

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        complited: complited != null ? complited : tasks[taskIndex].complited, 
        title, 
        comment
      }

      updateDoc(docRef, { 
        tasks: [
          ...tasks
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

  removeTask: (payload) => {
    const {taskIndex,  taskListId} = payload

    console.log(taskIndex,  taskListId)

    if(!taskListId) return



    const docRef = doc(db, DB_NAME, taskListId);

    getDoc(docRef)
    .then((doc) => {
      const tasks = doc.data().tasks

      const newTasks = tasks.filter((_, index) => index !== taskIndex)

      updateDoc(docRef, { 
        tasks: [
          ...newTasks
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