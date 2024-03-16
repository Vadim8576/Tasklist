import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import { fb } from '../api/firebase';
import { colors } from '../const/constants';
import AddTaskDialog from '../components/AddTaskDialog';
import { useAuth } from '../hooks/useAuth';
import { FAB } from 'react-native-paper';
import {toJS} from 'mobx'
import { observer } from "mobx-react-lite";
import appStore from '../store/appStore';

const TaskList = observer(({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const taskList = appStore.taskList
  const {user} = useAuth()
  const userId = user.uid


  useEffect(() => {
    if(!userId) return
    appStore.getTaskList(userId)

    console.log('TaskList user = ', user.uid)
    console.log('TaskList tasks = ', taskList)

  }, [userId])




  return (
    <View style={styles.container}>
      <FlatList
        data={appStore.taskList}
        renderItem={({ item, index }) => (
          <TouchableOpacity       
            onPress={
              () => navigation.navigate(
                'SubTaskList', { index }             
              )
            }
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
      />
      <AddTaskDialog visible={visible} setVisible={setVisible} />
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
});