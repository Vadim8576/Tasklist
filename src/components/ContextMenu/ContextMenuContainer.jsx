import { observer } from "mobx-react-lite";
import { dialogActions } from "../../const/constants";
import appStore from "../../store/appStore";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";


export default ContextMenuContainer = observer(({
  navigation,
  taskListId,
  taskIndex = null
}) => {

  const [menuVisible, setMenuVisible] = useState(false)
  const [key, setKey] = useState()

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


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


  const edit = () => {
    navigation.navigate('DialogScreen', {...options[key]})
    closeMenu()
  }

  const remove = () => {
    console.log('remove')
    closeMenu()
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

  useEffect(() => {
    // если сюда пришел taskIndex через пропсы, значит это SubTask,
    // если  null - это TaskList
    setKey(taskIndex === null ? 'TASK_LIST' : 'TASK')
  }, [taskIndex])


  return (
    <ContextMenu
      items={items}
      menuVisible={menuVisible}
      closeMenu={closeMenu}
      openMenu={openMenu}
      taskListId={taskListId}
      taskIndex={taskIndex}
    />
  )
})

