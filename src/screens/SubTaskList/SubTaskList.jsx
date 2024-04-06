import { useLayoutEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, View } from "react-native";
import appStore from '../../store/appStore';
import ListItem from "./listItem";
import { dialogActions } from "../../const/constants";
import AddButton from "../../components/AddButton";



export default SubTaskList = observer(({ route, navigation }) => {

  const { taskList } = route.params;
  const { title, createdAt, taskListId } = taskList


  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      description: createdAt
    })
  }, [title])


  return (
    <>
      <FlatList
        data={appStore?.tasks[taskListId]}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            taskIndex={index}
            taskListId={taskListId}
            navigation={navigation}
          />
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />
      <AddButton
        navigation={navigation}
        route={route}
        type={dialogActions.addTask}
        taskListId={taskListId}
      />
    </>
  );
})



const styles = StyleSheet.create({
  footer: {
    height: 90
  }
})