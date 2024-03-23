import { observer } from "mobx-react-lite";
import { useTheme, IconButton, Menu } from 'react-native-paper';
import { useState } from 'react';
import { useInputDialog } from "../../hooks/useInputDialog";
import { dialogActions } from "../../const/constants";
import InputDialog from "./InputDialog";
import appStore from "../../store/appStore";

export default MainContextMenu = observer(({
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
  } = useInputDialog({ type: dialogActions.editTaskListTitle, taskListId: item.taskListId })


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

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-vertical"
            size={15}
            onPress={openMenu}
          />
        }
        anchorPosition='bottom'
      >
        <Menu.Item
          leadingIcon="book-open"
          onPress={edit}
          title="Редактировать"
        />
        <Menu.Item
          leadingIcon="delete-restore"
          onPress={remove}
          title="Удалить"
        />
        <Menu.Item
          onPress={() => {
            console.log('Option 3 was pressed');
          }}
          title="Option 3"
          disabled
        />
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



