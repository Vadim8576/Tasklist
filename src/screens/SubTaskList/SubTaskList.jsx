import { useEffect, useLayoutEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FAB, List, Checkbox } from 'react-native-paper';
import appStore from '../../store/appStore';
import ListItem from "./listItem";
import { useInputDialog } from "../../hooks/useInputDialog";
import { dialogActions } from "../../const/constants";
import InputDialog from "./InputDialog";



export default SubTaskList = observer(({ route, navigation }) => {
  
  const { mainTask } = route.params;

  const {
    showDialog, 
    hideDialog, 
    onSubmit, 
    visible, 
    title, 
    setTitle,
    comment,
    setComment
  } = useInputDialog({type: dialogActions.addTask, mainTaskId: mainTask.mainTaskId})
  
  // console.log('SubTaskList tasks: ', appStore?.tasks)
  console.log('SubTaskList item: ', mainTask)
  console.log('item.mainTaskId ', mainTask.mainTaskId)
  console.log('item.mainTaskId ', mainTask.mainTaskId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mainTask.title,
      subtitle: mainTask.createdAt
    })
  }, [navigation, mainTask.title])


  return (
    <>
      <FlatList
        data={appStore?.subTasks[mainTask.mainTaskId]}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            taskIndex={index}
            mainTaskId={mainTask.mainTaskId}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showDialog}
      />
      <InputDialog
        visible={visible}
        hideDialog={hideDialog}
        onSubmit={onSubmit}
        title={title}
        setTitle={setTitle}
        comment={comment}
        setComment={setComment}
      />
    </>
  );
})



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
  }
})