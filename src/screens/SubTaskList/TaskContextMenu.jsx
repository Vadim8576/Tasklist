import { observer } from "mobx-react-lite";
import { useTheme, IconButton, Menu } from 'react-native-paper';
import { useState } from 'react';
import { dialogActions } from "../../const/constants";
import { useInputDialog } from "../../hooks/useInputDialog";
import InputDialog from "./InputDialog";
import appStore from "../../store/appStore";


export default ContextMenu = observer(({
  menuVisible,
  closeMenu,
  openMenu,
  item,
  taskIndex,
  mainTaskId
}) => {

  const theme = useTheme();

  const {
    showDialog,
    hideDialog,
    onSubmit,
    visible,
    title,
    comment,
    setComment,
    setTitle
  } = useInputDialog({ type: dialogActions.editTask, mainTaskId, taskIndex })



  const edit = () => {
    console.log('context menu mainTaskId = ', mainTaskId)
    console.log('context menu taskIndex = ', taskIndex)
    closeMenu()
    showDialog()
  }

  const remove = () => {
    console.log('remove')

    console.log('context menu mainTaskId = ', mainTaskId)
    console.log('context menu taskIndex = ', taskIndex)


    closeMenu()
    appStore.removeSubTask({ taskIndex, mainTaskId })
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
          onPress={edit}
          title="Редактировать"
        />
        <Menu.Item
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
        comment={comment}
        setComment={setComment}
        setTitle={setTitle}
      />
    </>

  )
})



