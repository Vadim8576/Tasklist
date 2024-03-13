import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { FlatList, Text, View, TouchableOpacity, Alert, TextInput, StyleSheet, Pressable } from 'react-native';
import { addTask, db } from '../api/firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import { colors } from '../const/constants';
import MyModal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};





const TaskList = () => {

  const { user } = useAuth()

  const [taskList, setTaskList] = useState([])
 


  const api_key = process.env.REACT_APP_FIREBASE_API_KEY;
  
  console.log('api_key = ', api_key)
  // console.log(firebaseConfig)


  useEffect(() => {

    const usersCollectionRef = collection(db, 'todolist')
    const unSub = onSnapshot((usersCollectionRef), snapshot => {
      setTaskList(snapshot.docs.map(doc => ({ ...doc.data() })))
    })

    return unSub

  }, [])


  const add = async () => {
    await addTask(user.uid)
  }



  if (taskList.length === 0) return null


  return (
    <View style={{
      paddingTop: 30,
    }}>
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={
              () => Alert.alert(`${item.task}`)
            }
          >
            <Text>{item.task}</Text>
          </TouchableOpacity>
        )}
      />
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Введите наименование задачи'
          value={taksTitle}
          onChangeText={setTaskTitle}
        />
        <TextInput
          style={styles.input}
          placeholder='Введите комментарий'
          value={taksComment}
          onChangeText={setTaskComment}
        />
      </View> */}

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={add}
        >
          <Text>+</Text>
        </Pressable>
      </View>
      <MyModal add />
    </View>
  );
}


export default TaskList


const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 40,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 3,
    backgroundColor: colors.ACCENT,
  }
});