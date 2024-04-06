
import { initializeApp } from 'firebase/app';

import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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
}


export const fb = {

  singIn: async (email, password) => {
    const a = await signInWithEmailAndPassword(auth, email, password)
    // .then(() => {
    //   // setSuccessMessage()
    // })
    // .catch((error) => {
    //   setErrorMessage()
    // })
  },

  logOut: () => {
    signOut(auth)
      .then(() => {
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
      })
  },

  createUser: (newUserData) => {

    const email = '1@mail.ru'
    const nickName = ''

    createUserWithEmailAndPassword(auth, email, '123456')
      .then((userCredential) => {

        const user = userCredential.user;

        const data = {
          email,
          nickName,
          friends: ['X4hFQZ8eNwROulLW4BRY4b70gmA3', 'y4Q2IaI2TSSAhPEmJGC1SvhnCnz1'],
          id: user.uid
        }

        const collectionRef = collection(db, 'users')
        const newDocRef = doc(collectionRef)

        setDoc(newDocRef, data)
          .then(() => {
            console.log('Пользователь успешно добавлен.');

          })
          .catch((error) => {
            console.log('Ошибка при добавлении данных пользователя', error)
            setErrorMessage()
          })
      })
      .catch((error) => {
        console.log('Ошибка при добавлении пользователя', error)
        setErrorMessage()
      })

  },

  getFriends: (payload) => {

    const { setFriends, userId } = payload
    const q = query(collection(db, 'users'), where('id', '==', userId));


    getDocs(q)
      .then((doc) => {
        const friendsIds = doc.docs[0].data().friends

        friendsIds.forEach((id) => {
          const q = query(collection(db, 'users'), where('id', '==', id));

          getDocs(q)
            .then((doc) => {
              setFriends({
                nickName: doc.docs[0].data().nickName,
                id: doc.docs[0].data().id,
              })
            })
            .catch((error) => {
              console.error('Ошибка получения данных друзей', error)
            })
        })
      })
      .catch((error) => {
        console.error('Ошибка получения друзей', error)
        setErrorMessage()
      })

  },





  getFriendById: async (friendId) => {
    const q = query(collection(db, 'users'), where('id', '==', friendId));

    const friend = await getDocs(q)
      .then((doc) => {
        console.log('getFriendById = ', doc.docs[0].data())
        return {
          id: doc.docs[0].data().id,
          nickName: doc.docs[0].data().nickName
        }
      })
      .catch((error) => {
        console.error('Ошибка получения друга', error)
        setErrorMessage()
      })
    console.log('friend = ', friend)
    return friend
  },




  addFriend: async (ids) => {
    const { userId, friendId } = ids

    if (!userId && !friendId) return

    const q = query(collection(db, 'users'), where('id', '==', userId));

    await getDocs(q)
      .then((data) => {
        const friends = [...data.docs[0].data().friends, friendId]
        const docId = data.docs[0].id
        const newDocRef = doc(db, 'users', docId);

        updateDoc(newDocRef, {
          friends
        })
          .then(() => {
            console.log('Друг успешно добавлена')

            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка при добавлении друга: ', error)
            setErrorMessage()
          })
      })
      .catch((error) => {
        console.log('Ошибка получения документа для обновления', error)
        setErrorMessage()
      })
  },



  taskSnapshot: (payload) => {
    const { setTaskList, userId } = payload

    if (!userId) return

    const q = query(collection(db, DB_NAME), where('creatorId', '==', userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allDocs = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        allDocs.push({
          taskListId: doc.id,
          title: data.title,
          createdAt: data.createdAt,
          tasks: data.tasks,
          creatorId: data.creatorId,
          groupUsersIds: data.groupUsersIds
        })
      })

      // console.log('allDocs = ', allDocs)
      setTaskList(allDocs)
    })


    return unsubscribe
  },


  addTaskList: (payload) => {
    const { userId, title } = payload

    const data = {
      title: title,
      createdAt: Timestamp.now().seconds,
      creatorId: userId,
      groupUsersIds: [],
      tasks: []
    }

    const collectionRef = collection(db, DB_NAME)
    const newDocRef = doc(collectionRef)

    setDoc(newDocRef, data)
      .then(() => {
        firstDocAdded = true;
        console.log('Документ успешно добавлен в коллекцию.');

        const docId = newDocRef.id;
        const updatedData = { ...data, taskListId: docId };

        setDoc(newDocRef, updatedData)
          .then(() => {
            console.log('ID успешно добавлен в данные документа.');
            // setSuccessMessage()
          })
          .catch((error) => {
            console.error('Ошибка при добавлении ID в данные документа:', error);
            setErrorMessage()
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
  },

  updateTaskList: (payload) => {
    const { title, taskListId } = payload
    if (!taskListId) return

    const docRef = doc(db, DB_NAME, taskListId);

    updateDoc(docRef, {
      title: title
    })
      .then((doc) => {
        console.log('Список задач успешно обновлен')
        // setSuccessMessage()
      })
      .catch((error) => {
        console.log('Ошибка обновления названия списка задач', error)
        setErrorMessage()
      })
  },

  removeTaskList: (taskListId) => {
    deleteDoc(doc(db, DB_NAME, taskListId))
      .then(_ => {
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
      })
  },

  addTask: (payload) => {
    const { title, comment, taskListId } = payload
    console.log(title, comment, taskListId)

    if (!taskListId) return

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
            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка добавления таски: ', error)
            setErrorMessage()
          })
      })
      .catch((error) => {
        console.log('Ошибка получения документа для обновления', error)
        setErrorMessage()
      })

  },

  updateTask: (payload) => {
    const { taskIndex, title, comment, complited = null, taskListId } = payload
    if (!taskListId) return

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
            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка обновления таски: ', error)
            setErrorMessage()
          })
      })
      .catch((error) => {
        console.log('Ошибка получения документа для обновления', error)
        setErrorMessage()
      })

  },

  removeTask: (payload) => {
    const { taskIndex, taskListId } = payload

    console.log(taskIndex, taskListId)

    if (!taskListId) return

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
            console.log('Таска успешно удалена')
            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка удаления таски: ', error)
            setErrorMessage()
          })
      })
      .catch((error) => {
        console.log('Ошибка получения документа для обновления', error)
        setErrorMessage()
      })

  },

  removeAllTaskList: () => {

    const collectionRef = collection(db, DB_NAME)
    getDocs(collectionRef)
      .then((docs) => {
        docs.forEach((doc) => {
          deleteDoc(doc.ref)
            .then(() => {
              console.log(`Документ ${doc.id} успешно удален`)
            })
            .catch((error) => {
              console.error(`Ошибка при удалении документа ${doc.id}:`, error)
              setErrorMessage()
            })
        })
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
      })

  }
}




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