import { useEffect, useLayoutEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native";
import ListItem from "./ListItem";
import { dialogActions } from "../../const/constants";
import { Avatar, Portal, Dialog, TouchableRipple, useTheme, IconButton } from "react-native-paper";
import { useGroupButton } from "../../hooks/useGroupButton";
import GroupButton from "../../components/UI/GroupButton";
import appStore from "../../store/appStore";
import usersStore from "../../store/usersStore";
import { useAuth } from "../../hooks/useAuth";
import FavoriteUserList from "../FavoriteUsers/FavoriteUserList";
import AddButton from "../../components/UI/AddButton";
import MembersListDialog from "../../components/MembersListDialog";
import useGetMembersByIds from "../../hooks/useGetMembersByIds";
import MembersHorizontalList from "../../components/MembersHorizontalList";



export default SubTaskList = observer(({ route, navigation }) => {

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { user } = useAuth()
  const userId = user.uid


  const theme = useTheme()
  const { taskList } = route.params;
  // const taskList = appStore.taskList




  const { title, taskListId, createdAt } = taskList
  const screenName = route.name




  // console.log('SubTaskList screenName = ', screenName)
  // console.log('SubTaskList taskList = ', taskList.membersIds)

  // console.log('taskList!!!!!!!!!!!!!!! = ', taskList)

  const { buttonGroup } = useGroupButton({
    navigation,
    actionType: dialogActions.addTask,
    listId: taskListId
  })

  const members = useGetMembersByIds(appStore.members[taskList.taskListId])

  // const membersIds = members.map(member => member.id)

  console.log('members!!!!!!!!!!!!!!! = ', members)



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




  useEffect(() => {

    // authStore.createUser()
    if (!userId) return
    usersStore.getFavoriteUsers(userId)

  }, [userId])



  return (
    <>
      <View style={{ padding: 20 }}>
        <MembersHorizontalList members={members} size={30} showModal={showModal} />
      </View>


      {/* 
      <Button
        title="Press me"
        onPress={showModal}
      /> */}




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


              onPress={() => buttonGroup.onPressItem(item)}
              onLongPress={() => {
                buttonGroup.onLongPressItem(item.subTaskListId)
              }}
            >
              <ListItem
                isSelected={buttonGroup.getSelected(item.subTaskListId)}
                item={item}
                taskListId={taskListId}
                subTaskListId={item.subTaskListId}
              />
            </TouchableRipple>

          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
        <GroupButton
          buttonGroup={buttonGroup}
        />
      </View>

      <MembersListDialog
        visible={visible}
        hideModal={hideModal}
        taskListId={taskListId}
      />

    </>
  )
})



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // marginTop: 30,
    // paddingTop: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  footer: {
    height: 85
  },
})