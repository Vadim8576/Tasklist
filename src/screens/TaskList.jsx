import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { addTask, db } from '../api/firebase';
import { colors } from '../const/constants';
import AddTaskDialog from '../components/AddTaskDialog';
import { useAuth } from '../hooks/useAuth';
import { FAB } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import appStore from '../store/appStore';


const TaskList = observer(() => {

  const { user } = useAuth()
  const {getTaskList} = appStore
  // const [taskList, setTaskList] = useState(getTaskList)
  const [visible, setVisible] = useState(false);

  const taskList = appStore.getTaskList()

  

  useEffect(() => {
    



    // console.log('getTaskList = ', toJS(getTaskList))

    // const usersCollectionRef = collection(db, 'todolist')
    // const unSub = onSnapshot((usersCollectionRef), snapshot => {
    //   setTaskList(snapshot.docs.map(doc => ({ ...doc.data() })))
    // })

    // return unSub

  }, [])


  const add = async () => {
    await addTask(user.uid)
  }



  if (taskList.length === 0) return (
    <View style={styles.container}>
      <Text>Список пуст</Text>
    </View>
  )


  return (
    <View style={styles.container}
    >
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
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
      />
      <AddTaskDialog add visible={visible} setVisible={setVisible} />
    </View>
  );
})

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