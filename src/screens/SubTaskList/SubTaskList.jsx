import { useEffect, useLayoutEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, FlatList, ScrollView, StyleSheet, View } from "react-native";
import ListItem from "./ListItem";
import { dialogActions } from "../../const/constants";
import { Avatar, Portal, Dialog, TouchableRipple, useTheme, IconButton } from "react-native-paper";
import { useGroupButton } from "../../hooks/useGroupButton";
import GroupButton from "../../components/UI/GroupButton";
import appStore from "../../store/appStore";
import friendsStore from "../../store/friendsStore";
import { useAuth } from "../../hooks/useAuth";
import FriendsList from "../FavoriteUsers/FriendsList";
import AddButton from "../../components/UI/AddButton";



export default SubTaskList = observer(({ route, navigation }) => {



  const { user } = useAuth()
  const userId = user.uid


  const [visible, setVisible] = useState(true);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // const containerStyle = {  };



  const theme = useTheme()
  const { taskList } = route.params;
  const { title, taskListId, createdAt } = taskList
  const screenName = route.name




  // console.log('SubTaskList screenName = ', screenName)
  // console.log('SubTaskList taskList = ', taskList.groupUsersIds)

  console.log(taskList)

  // debugger

  const {
    buttonGroup
  } = useGroupButton({
    navigation,
    type: dialogActions.addTask,
    listId: taskListId
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




  useEffect(() => {

    // authStore.createUser()
    if (!userId) return
    friendsStore.getFriends(userId)

  }, [userId])



  return (
    <>
      {
        taskList.groupUsersIds.length > 0 &&
        <View style={{ padding: 20 }}>
          <ScrollView
            horizontal={true}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            {
              // taskList.groupUsersIds.map(id => (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(id => (
                <Avatar.Text
                  key={id}
                  style={{ backgroundColor: theme.colors.primaryContainer, marginRight: 10 }}
                  size={40}
                  label="XD"
                />
              ))
            }
          </ScrollView>


        </View>
      }





      <Button
        title="Press me"
        onPress={showModal}
      />




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



      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideModal}
          style={{
            padding: 0,
            backgroundColor: 'white',
            maxHeight: '70%'
          }}
        >
          <Dialog.Title>Участники</Dialog.Title>

          <Dialog.ScrollArea>
            <FriendsList
              friends={[
                { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs1", "nickName": "Александр" },
                { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz2", "nickName": "Люся" },
                { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs3", "nickName": "Александр" },
                { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz4", "nickName": "Люся" },
                { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs5", "nickName": "Александр" },
                { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz6", "nickName": "Люся" },
                { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs7", "nickName": "Александр" },
                { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz8", "nickName": "Люся" },
                { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs9", "nickName": "Александр" },
                { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz0", "nickName": "Люся" },
              ]} />
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <IconButton
              icon="plus"
              size={26}
              containerColor={theme.colors.tertiary}
              iconColor={theme.colors.onTertiary}
              onPress={() => console.log('Pressed')}
            />


          </Dialog.Actions>
        </Dialog>

      </Portal >
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