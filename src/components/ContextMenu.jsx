import { observer } from "mobx-react-lite";
import { useTheme, IconButton, Menu } from 'react-native-paper';
import { dialogActions } from "../const/constants";
import appStore from "../store/appStore";
import ContextMenuItem from "./ContextMenuItem";
import { useEffect, useState } from "react";


export default TaskListContextMenu = observer(({
  navigation,
  menuVisible,
  closeMenu,
  openMenu,
  taskListId,
  taskIndex = null
}) => {

  const [key, setKey] = useState()

  const theme = useTheme();

  const edit = () => {
    navigation.navigate('DialogScreen', options[key])
    closeMenu()
  }

  const remove = () => {
    console.log('remove')
    closeMenu()
    console.log('key = ', key)
    options[key].remove()
  }

  const items = [
    {
      title: 'Редактировать',
      // icon: 'book-open',
      onPress: edit
    },
    {
      title: 'Удалить',
      // icon: 'delete-restore',
      onPress: remove
    }
  ]

  const options = {
    'TASK_LIST': {
      type: dialogActions.editTaskListTitle,
      taskListId,
      remove: () => appStore.removeTaskList(taskListId)
    },
    'TASK': {
      type: dialogActions.editTask,
      taskListId,
      taskIndex,
      remove: () => appStore.removeTask({taskListId, taskIndex})
    },
  }

  useEffect(() => {
    // если сюда пришел taskIndex через пропсы, значит это SubTask,
    // если  null - это TaskList
    setKey(taskIndex === null ? 'TASK_LIST' : 'TASK')
  }, [taskIndex])




  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchorPosition='bottom'
      anchor={
        <IconButton
          icon="dots-vertical"
          size={15}
          onPress={openMenu}
        />
      }
    >
      <ContextMenuItem items={items} />
    </Menu>
  )
})

