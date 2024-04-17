import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, View } from "react-native";
import appStore from '../../store/appStore';
import ListItem from "./listItem";
import { dialogActions } from "../../const/constants";
import { TouchableRipple, useTheme } from "react-native-paper";
import { useGroupButton } from "../../hooks/useGroupButton";
import GroupButton from "../../components/UI/GroupButton";



export default SubTaskList = observer(({ route, navigation }) => {

  const theme = useTheme()
  const { taskList } = route.params;
  const { title, taskListId, createdAt } = taskList


  // const {
  //   addButtonVisible,
  //   buttonGroupIsOpen,
  //   setButtonGroupIsOpen,
  //   currentListId,
  //   addTask,
  //   edit,
  //   remove,
  //   onPressItem,
  //   onLongPressItem
  // } = useGroupButton({
  //   navigation,
  //   type: dialogActions.addTask,
  //   listId: taskList.taskListId
  // })


  const {
    buttonGroup
  } = useGroupButton({
    navigation,
    type: dialogActions.addTask,
    listId: taskList.taskListId
  })



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
        { backgroundColor: theme.colors.background }
      ]}
      >
        <FlatList
          data={appStore?.subTaskList}

          renderItem={({ item }) => (
            <TouchableRipple
              key={item.subTaskListId}
              background={theme.colors.surfaceVariant}
              onPress={() => onPressItem(item)}
              onLongPress={() => {
                onLongPressItem(item.subTaskListId)
                setButtonGroupIsOpen(true)
              }}
            >
              <ListItem
                item={item}
                taskListId={taskListId}
                subTaskListId={item.subTaskListId}
                currentListId={currentListId}
              />
            </TouchableRipple>

          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
        <GroupButton
          buttonGroup={buttonGroup}
        />
      </View>

    </>
  );
})



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
    // paddingTop: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  footer: {
    height: 85
  }
})