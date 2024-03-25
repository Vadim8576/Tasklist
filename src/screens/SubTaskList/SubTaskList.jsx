import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, View } from "react-native";
import appStore from '../../store/appStore';
import ListItem from "./listItem";
import { useInputDialog } from "../../hooks/useInputDialog";
import { dialogActions } from "../../const/constants";
import InputDialog from "./InputDialog";
import AddButton from "../../components/AddButton";



export default SubTaskList = observer(({ route, navigation }) => {
  
  const { taskList } = route.params;

  const {
    showDialog, 
    hideDialog, 
    onSubmit, 
    visible, 
    title, 
    setTitle,
    comment,
    setComment
  } = useInputDialog({
    type: dialogActions.addTask, taskListId: taskList.taskListId
  })
  
  // console.log('SubTaskList tasks: ', appStore?.tasks)
  console.log('SubTaskList item: ', taskList)
  console.log('item.taskListId ', taskList.taskListId)
  console.log('item.taskListId ', taskList.taskListId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: taskList.title,
      subtitle: taskList.createdAt
    })
  }, [navigation, taskList.title])


  return (
    <>
      <FlatList
        data={appStore?.tasks[taskList.taskListId]}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            taskIndex={index}
            taskListId={taskList.taskListId}
          />
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />
     <AddButton
        showDialog={showDialog}
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
  footer: {
    height: 90
  }
})