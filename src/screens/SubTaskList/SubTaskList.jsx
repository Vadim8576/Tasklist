import { useLayoutEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, View } from "react-native";
import appStore from '../../store/appStore';
import ListItem from "./listItem";
import { dialogActions } from "../../const/constants";
import { useTheme } from "react-native-paper";
import { useGroupButton } from "../../hooks/useGroupButton";
import AddButton from "../../components/UI/AddButton";



export default SubTaskList = observer(({ route, navigation }) => {

  const theme = useTheme()
  const { taskList } = route.params;
  const { title, taskListId, createdAt } = taskList

  const {
    addButtonVisible,
    addButtonOnPress
  } = useGroupButton({ navigation, type: dialogActions.addTask, listId: taskListId })

  console.log('SubTaskList appStore?.subTaskList.subTaskListId = ', appStore?.subTaskList.subTaskListId)



  useLayoutEffect(() => {
    if (!taskListId) return

    const unsubscribe = appStore.subscribeToSubTaskList(taskListId)

    return unsubscribe
  }, [taskListId])


  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      description: createdAt
    })
  }, [title])



  return (
    <>
      <View style={[
        styles.container,
        { backgroundColor: theme.colors.surfaceVariant }
      ]}
      >
        <FlatList
          data={appStore?.subTaskList}
          renderItem={({ item }) => (
            <ListItem
              key={item.subTaskListId}
              item={item}
              taskListId={taskListId}
              subTaskListId={item.subTaskListId}
              navigation={navigation}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
        <AddButton
          addButtonVisible={addButtonVisible}
          addButtonOnPress={addButtonOnPress}
        />
      </View>

    </>
  );
})



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  footer: {
    height: 85
  }
})