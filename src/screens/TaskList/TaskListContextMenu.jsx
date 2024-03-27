import { observer } from "mobx-react-lite";
import { useTheme, IconButton, Menu } from 'react-native-paper';
import { useInputDialog } from "../../hooks/useInputDialog";
import { dialogActions } from "../../const/constants";
import InputDialog from "./InputDialog";
import appStore from "../../store/appStore";
import { StyleSheet } from "react-native";
import ContextMenuItem from "../../components/ContextMenuItem";

export default TaskListContextMenu = observer(({
  menuVisible,
  closeMenu,
  openMenu,
  item
}) => {

  const theme = useTheme();

  const {
    showDialog,
    hideDialog,
    onSubmit,
    visible,
    title,
    setTitle
  } = useInputDialog({
    type: dialogActions.editTaskListTitle,
    taskListId: item.taskListId
  })


  // console.log('context menu taskListId = ', item.taskListId)

  const edit = () => {
    console.log('context menu taskListId = ', item.taskListId)
    closeMenu()
    showDialog()
  }

  const remove = () => {
    console.log('remove')
    closeMenu()
    appStore.removeTaskList(item.taskListId)
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
    },
    {
      title: 'Option 3',
      icon: null,
      onPress: null
    },
  ]


  return (
    <>
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

      <InputDialog
        visible={visible}
        hideDialog={hideDialog}
        onSubmit={onSubmit}
        title={title}
        setTitle={setTitle}
      />
    </>
  )
})

