import { observer } from "mobx-react-lite";
import { dialogActions } from "../../const/constants";
import appStore from "../../store/appStore";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";


export default ContextMenuContainer = observer(({
  navigation,
  listId,
  currentList
}) => {

  const [menuVisible, setMenuVisible] = useState(false)

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


  const options = {
    'TASK_LIST': {
      type: dialogActions.editTaskListTitle,
      listId,
      remove: () => appStore.removeTaskList(listId)
    },
    'SUB_TASK': {
      type: dialogActions.editTask,
      listId,
      remove: () => appStore.removeTask(listId)
    },
  }


  const edit = () => {
    const {remove, ...otherOptions} = options[currentList]
    navigation.navigate('DialogScreen', otherOptions)
    closeMenu()
  }

  const remove = () => {
    console.log('remove')
    closeMenu()
    options[currentList].remove()
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


  return (
    <ContextMenu
      items={items}
      menuVisible={menuVisible}
      closeMenu={closeMenu}
      openMenu={openMenu}
    />
  )
})

