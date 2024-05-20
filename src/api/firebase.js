
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

    const { email, password, nickName, setNewUserCreated } = newUserData

    // const email = '1@mail.ru'
    // const nickName = ''

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;

        const data = {
          email,
          nickName,
          friends: [],
          id: user.uid
        }

        const collectionRef = collection(db, 'users')
        const newDocRef = doc(collectionRef)

        setDoc(newDocRef, data)
          .then(() => {
            console.log('Пользователь успешно добавлен.');
            setNewUserCreated('yes')
          })
          .catch((error) => {
            console.log('Ошибка при добавлении данных пользователя', error)
            setErrorMessage()
            setNewUserCreated('error')
          })
      })
      .catch((error) => {
        console.log('Ошибка при добавлении пользователя', error)
        setErrorMessage()
        setNewUserCreated('error')
      })

  },

  getFavoriteUsers: async (userId) => {
    const q = query(collection(db, 'users'), where('id', '==', userId));

    const docs = await getDocs(q)
    const favoriteUsersIds = docs.docs[0].data().friends

    if (favoriteUsersIds.length === 0) return []

    const favoriteUsersPromises = favoriteUsersIds.map(async (id) => {
      const q = query(collection(db, 'users'), where('id', '==', id));
      const favoriteUser = await getDocs(q)

      if (!favoriteUser) return null

      return {
        nickName: favoriteUser.docs[0].data().nickName,
        id: favoriteUser.docs[0].data().id,
      }
    })

    const favoriteUsers = await Promise.all(favoriteUsersPromises);
    console.log('favoriteUsers = ', favoriteUsers)

    return favoriteUsers

  },





  getUserById: async (friendId) => {

    // console.log('FIRABASE friendId = ', friendId)

    // debugger
    try {
      const q = query(collection(db, 'users'), where('id', '==', friendId));

      const member = await getDocs(q)



      // console.log('FIRABASE member = ', member.docs)

      if (!member.docs[0]) return null

      const id = member.docs[0].data().id
      const nickName = member.docs[0].data().nickName


      // console.log('111111111111111111111111111111111111111111111111111111111111111111111111111111111')
      // console.log('id = ', id, 'nickName = ', nickName)

      return { id, nickName }
    } catch (error) {
      console.error('Ошибка получения друга', error)
      setErrorMessage()
    }
  },




  addFavoriteUser: async (ids) => {
    const { userId, friendId } = ids

    if (!userId && !friendId) return


    console.log('firebase addFavoriteUser')
    try {
      const q = query(collection(db, 'users'), where('id', '==', userId));

      const user = await getDocs(q)

      if (user) {
        const friends = [...user.docs[0].data().friends, friendId]
        const docId = user.docs[0].id

        // console.log('friends = ', user.docs[0].data())
        const newDocRef = doc(db, 'users', docId);

        await updateDoc(newDocRef, {
          friends
        })

      }
    } catch (error) {
      console.log('Ошибка получения документа для обновления', error)
      setErrorMessage()
    }

  },



  removeFavoriteUser: async (ids) => {

    const { userId, friendId } = ids

    console.log('friendId = ', friendId)
    console.log('userId = ', userId)

    if (!userId && !friendId) return

    const q = query(collection(db, 'users'), where('id', '==', userId));


    await getDocs(q)
      .then((data) => {
        const friends = data.docs[0].data().friends.filter(id => id !== friendId)

        const docId = data.docs[0].id


        console.log('updateFriends = ', friends)



        const newDocRef = doc(db, 'users', docId);


        updateDoc(newDocRef, {
          friends
        })
          .then(() => {
            console.log('Друг успешно удален')

            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка при удалении друга: ', error)
            setErrorMessage()
          })

      })
      .catch((error) => {
        console.log('Ошибка получения документа для удаления', error)
        setErrorMessage()
      })

  },



  removeMember: async (ids) => {

    const { taskListId, memberId } = ids

    console.log('memberId = ', memberId)
    console.log('taskListId = ', taskListId)


    if (!memberId && !taskListId) return

    const q = query(collection(db, 'grouplist'), where('taskListId', '==', taskListId));



    // X4hFQZ8eNwROulLW4BRY4b70gmA3
    // y4Q2IaI2TSSAhPEmJGC1SvhnCnz1

    await getDocs(q)
      .then((data) => {
        const members = data.docs[0].data().groupUsersIds.filter(id => id !== memberId)

        const docId = data.docs[0].id


        console.log('update members = ', members)
        console.log('docId = ', docId)

        const newDocRef = doc(db, 'grouplist', docId);

        updateDoc(newDocRef, {
          groupUsersIds: members
        })
          .then(() => {
            console.log('Участник успешно удален')

            // setSuccessMessage()
          })
          .catch((error) => {
            console.log('Ошибка при удалении участника: ', error)
            setErrorMessage()
          })

      })
      .catch((error) => {
        console.log('Ошибка получения документа для удаления участника', error)
        setErrorMessage()
      })

  },







  taskListSnapshot: (payload) => {
    const { setTaskList, userId, collectionId } = payload

    console.log('taskListSnapshot = ', collectionId)

    if (!userId || !collectionId) return


  
    const q = query(collection(db, collectionId), where('creatorId', '==', userId));

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
    const { userId, title, createdAt, collectionId } = payload

    console.log('collectionId = ', collectionId)

    if (title === '') return

    const data = {
      title: title,
      createdAt,
      creatorId: userId,
      groupUsersIds: []
    }

    const collectionRef = collection(db, collectionId)
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
    const { title, listId, collectionId } = payload
    if (!listId || !collectionId) return

    const docRef = doc(db, collectionId, listId);

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

  removeTaskList: (payload) => {
    const {listId, collectionId} = payload
    deleteDoc(doc(db, collectionId, listId))
      .then(() => {
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
        console.log('Ошбика удаления списка задач: ', error)
      })
  },

  removeSelectedTaskList: async (payload) => {

    const {selectedItemsIds, collectionId} = payload
    const removePromise = selectedItemsIds.map(async (id) => {

      try {
        await deleteDoc( doc(db, collectionId, id))
      } catch (error) {
        setErrorMessage()
          console.log('Ошбика удаления списка задач c id: ', id, error)
      }
      return id
    })

    const removeIds = await Promise.all(removePromise);

  },





  subTaskListSnapshot: (payload) => {
    const { setSubTaskList, taskListId } = payload

    if (!taskListId) return

    const q = query(collection(db, 'subtasklist'), where('taskListId', '==', taskListId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allDocs = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        allDocs.push({
          title: data.title,
          comment: data.comment,
          subTaskListId: data.subTaskListId,
          complited: data.complited
        })
      })

      // console.log('allDocs = ', allDocs)
      setSubTaskList(allDocs)
    })


    return unsubscribe
  },

  addTask: (payload) => {
    const { title, comment, listId } = payload

    if (!listId && title === '') return

    const data = {
      title,
      comment,
      complited: false,
      taskListId: listId
    }

    const collectionRef = collection(db, 'subtasklist')
    const newDocRef = doc(collectionRef)

    setDoc(newDocRef, data)
      .then(() => {
        // console.log('Задача успешно добавлена.');

        firstDocAdded = true;

        const docId = newDocRef.id;
        const updatedData = { ...data, subTaskListId: docId };

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
                console.log('Документ удален, так как взникла ошибка.');
              })
                .catch((deleteError) => {
                  console.error('Ошибка при удалении первого документа:', deleteError);
                })
            }
          })
      })
      .catch((deleteError) => {
        console.error('Ошибка при добавлении задачи:', deleteError);
        setErrorMessage()
      })

  },
  // addTask: (payload) => {
  //   const { title, comment, taskListId } = payload
  //   console.log(title, comment, taskListId)

  //   if (!taskListId) return

  //   const docRef = doc(db, DB_NAME, taskListId);

  //   getDoc(docRef)
  //     .then((doc) => {
  //       const tasks = doc.data().tasks

  //       updateDoc(docRef, {
  //         tasks: [
  //           ...tasks,
  //           {
  //             title: title,
  //             comment: comment,
  //             complited: false
  //           }
  //         ]
  //       })
  //         .then(() => {
  //           console.log('Таска успешно добавлена')
  //         })
  //         .catch((error) => {
  //           console.log('Ошибка добавления таски: ', error)
  //           setErrorMessage()
  //         })
  //     })
  //     .catch((error) => {
  //       console.log('Ошибка получения документа для обновления', error)
  //       setErrorMessage()
  //     })

  // },

  updateTask: (payload) => {

    const { listId, ...updateData } = payload
    console.log('listId ', listId)
    if (!listId) return

    // console.log('updateData ', updateData)

    const docRef = doc(db, 'subtasklist', listId);

    updateDoc(docRef,
      updateData
    )
      .then(() => {
        console.log('Таска успешно обновлена')
      })
      .catch((error) => {
        console.log('Ошибка обновления таски: ', error)
        setErrorMessage()
      })


  },
  // updateTask: (payload) => {
  //   const { taskIndex, title, comment, complited = null, taskListId } = payload
  //   if (!taskListId) return

  //   const docRef = doc(db, DB_NAME, taskListId);

  //   getDoc(docRef)
  //     .then((doc) => {
  //       const tasks = doc.data().tasks

  //       tasks[taskIndex] = {
  //         ...tasks[taskIndex],
  //         complited: complited != null ? complited : tasks[taskIndex].complited,
  //         title,
  //         comment
  //       }

  //       updateDoc(docRef, {
  //         tasks: [
  //           ...tasks
  //         ]
  //       })
  //         .then(() => {
  //           console.log('Таска успешно обновлена')
  //         })
  //         .catch((error) => {
  //           console.log('Ошибка обновления таски: ', error)
  //           setErrorMessage()
  //         })
  //     })
  //     .catch((error) => {
  //       console.log('Ошибка получения документа для обновления', error)
  //       setErrorMessage()
  //     })

  // },

  removeTask: (listId) => {



    if (!listId) return


    deleteDoc(doc(db, 'subtasklist', listId))
      .then(() => {
        // setSuccessMessage()
      })
      .catch((error) => {
        setErrorMessage()
      })

    // const docRef = doc(db, 'subtasklist', listId);

    // getDoc(docRef)
    //   .then((doc) => {
    //     const tasks = doc.data().tasks

    //     const newTasks = tasks.filter((_, index) => index !== taskIndex)

    //     updateDoc(docRef, {
    //       tasks: [
    //         ...newTasks
    //       ]
    //     })
    //       .then(() => {
    //         console.log('Таска успешно удалена')
    //         // setSuccessMessage()
    //       })
    //       .catch((error) => {
    //         console.log('Ошибка удаления таски: ', error)
    //         setErrorMessage()
    //       })
    //   })
    //   .catch((error) => {
    //     console.log('Ошибка получения документа для обновления', error)
    //     setErrorMessage()
    //   })

  },


  removeSelectedTask: async (ids) => {

    const removePromise = ids.map(async (id) => {

      try {
        await deleteDoc( doc(db, 'subtasklist', id))
      } catch (error) {
        setErrorMessage()
          console.log('Ошбика удаления задач c id: ', id, error)
      }
      return id
    })

    const removeIds = await Promise.all(removePromise);

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