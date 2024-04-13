
import { FlatList, View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { dialogActions } from '../../const/constants';
import AddButton from '../../components/UI/AddButton';
import GroupButton from '../../components/UI/GroupButton';
import ListItem from './ListItem';
import { useListFilter } from '../../hooks/useListFilter';
import appStore from '../../store/appStore';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGroupButton } from '../../hooks/useGroupButton';



export default TaskList = observer(({ navigation, route }) => {

  const [buttonGroupIsOpen, setButtonGroupIsOpen] = useState(false)
  // const [currentListId, setCurrentListId] = useState(null)
  const [currentList, setCurrentList] = useState({ name: 'TASK_LIST', id: null })

  const theme = useTheme()

  const { user } = useAuth()
  const userId = user.uid

  const {
    addButtonVisible,
    checkboxChange,
    addTask,
    edit,
    remove
  } = useGroupButton({
    navigation,
    type: dialogActions.addTaskList,
    currentListName: currentList.name
  })

  const taskList = appStore.taskList
  const screenName = route.name
  const filteredList = useListFilter(taskList, screenName)

  console.log('mAINtASKlIST render')


  useEffect(() => {
    if (!userId) return

    const unsubscribe = appStore.subscribeToTaskList(userId)

    return unsubscribe
  }, [userId])


  const itemLongPress = (listId) => {
    setButtonGroupIsOpen(true)
    setCurrentList(state => ({ ...state, id: listId }))
  }



  return (
    <>
      <View style={[
        styles.container,
        { backgroundColor: theme.colors.surfaceVariant }
      ]}
      >
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <TouchableRipple
              key={item.taskListId}
              background={theme.colors.surfaceVariant}
              onPress={
                () => navigation.navigate(
                  'SubTaskList', {
                  taskList: item
                })
              }
              onLongPress={() => itemLongPress(item.taskListId)}
            >
              <ListItem
                taskList={item}
              />
            </TouchableRipple>

          )}
          ListFooterComponent={<View style={[
            styles.footer,
          ]} />}
        // ListEmptyComponent={}
        />
      </View>
      {/* <AddButton
        addButtonVisible={addButtonVisible}
        addButtonOnPress={addButtonOnPress}
      /> */}

      <GroupButton
        addButtonVisible={addButtonVisible}
        buttonGroupIsOpen={buttonGroupIsOpen}
        setButtonGroupIsOpen={setButtonGroupIsOpen}
        checkboxChange={checkboxChange}
        addTask={addTask}
        edit={() => edit(currentList.id)}
        remove={() => remove(currentList.id)}
      />
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
    height: 85,
  }
});