import { useState } from "react";
// import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, TextInput, Text } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useInputDialog } from "../hooks/useInputDialog";
import { currentAction } from "../const/constants";

export default InputDialog = observer(() => {

  // const {visible, hideDialog, onSubmit} = useInputDialog()

  // const [title, setTitle] = useState('')
  // const [comment, setComment] = useState('')

 


  return (
    <Portal>
      {/* <Dialog visible={visible} onDismiss={hideDialog}>
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
          {
            screenName === 'SubTaskList' &&
            <TextInput
              multiline={true}
              numberOfLines={2}
              style={styles.input}
              placeholder='Введите комментарий'
              value={comment}
              onChangeText={setComment}
            />
          }

        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={onSubmit}>Ok</Button>
        </Dialog.Actions>
      </Dialog> */}
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


