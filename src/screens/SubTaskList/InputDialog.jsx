import { useState } from "react";
// import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, TextInput, Text } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useInputDialog } from "../../hooks/useInputDialog";


export default InputDialog = observer(({
  visible, setVisible, taskListId, type
}) => {

  const {
    hideDialog,
    onSubmit,
    title,
    setTitle,
    comment,
    setComment
  } = useInputDialog({
    type, taskListId
  })

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">Добавить задачу</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            placeholder='Введите наименование задачи'
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            placeholder='Введите комментарий'
            value={comment}
            onChangeText={setComment}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => {
            hideDialog()
            setVisible(false)
          }}>Cancel</Button>
          <Button onPress={() => {
            onSubmit()
            setVisible(false)
          }}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
})


const styles = StyleSheet.create({

  input: {
    margin: 5,
    marginTop: 30,
    fontSize: 12,
  },
});


