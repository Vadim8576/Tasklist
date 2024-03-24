import { observer } from "mobx-react-lite";
import { useTheme, IconButton, Menu } from 'react-native-paper';
import { dialogActions } from "../../const/constants";
import { useInputDialog } from "../../hooks/useInputDialog";
import InputDialog from "./InputDialog";
import appStore from "../../store/appStore";
import { StyleSheet } from "react-native";
import ContextMenuItem from "../../components/ContextMenuItem";


export default ContextMenu = observer(({
  menuVisible,
  closeMenu,
  openMenu,
  taskIndex,
  taskListId
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
  } = useInputDialog({ type: dialogActions.editTask, taskListId, taskIndex })


  const edit = () => {
    closeMenu()
    showDialog()
  }

  const remove = () => {
    console.log('remove')

    closeMenu()
    appStore.removeTask({ taskIndex, taskListId })
  }

  const items = [
    {
      title: 'Редактировать',
      onPress: edit
    },
    {
      title: 'Удалить',
      onPress: remove
    },
    {
      title: 'Option 3',
      onPress: null
    },
  ]

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
        <ContextMenuItem items={items} />
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



const styles = StyleSheet.create({
  title: {
    fontSize: 13
  },
})


