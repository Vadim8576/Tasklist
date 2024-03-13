import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { FlatList, Text, View, TouchableOpacity, Alert, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { addTask, db } from '../api/firebase';
import { colors } from '../const/constants';
import AddTaskDialog from '../components/AddTaskDialog';
import { useAuth } from '../hooks/useAuth';

import { FAB } from 'react-native-paper';


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
  const [visible, setVisible] = useState(false);


  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

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
    <View style={styles.container}
    >
      <FlatList
        onScroll={onScroll}
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
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
      />
      <AddTaskDialog add visible={visible} setVisible={setVisible} />
    </View>
  );
}

export default TaskList




const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

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