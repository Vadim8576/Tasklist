import { useLayoutEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, View } from "react-native";
import appStore from '../../store/appStore';
import ListItem from "./listItem";
import { useInputDialog } from "../../hooks/useInputDialog";
import { dialogActions } from "../../const/constants";
import InputDialog from "./InputDialog";
import AddButton from "../../components/AddButton";



export default SubTaskList = observer(({ route, navigation }) => {
  
  const [visible, setVisible] = useState(false)
  const { taskList } = route.params;
  const { title, createdAt, taskListId  } = taskList


  
  // console.log('SubTaskList tasks: ', appStore?.tasks)
  console.log('SubTaskList item: ', taskList)
  console.log('item.taskListId ', taskListId)
  console.log('item.taskListId ', createdAt)

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      description: createdAt
    })
  }, [navigation, title])


  return (
    <>
      <FlatList
        data={appStore?.tasks[taskListId]}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            taskIndex={index}
            taskListId={taskListId}
          />
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />
     <AddButton
        showDialog={() => setVisible(true)}
      />
      <InputDialog
        visible={visible}
        setVisible={setVisible}
        type={dialogActions.addTask}
        taskListId={taskListId}
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