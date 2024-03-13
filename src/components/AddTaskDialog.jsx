import { useState } from "react";
// import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, TextInput, Text } from 'react-native-paper';


export default AddTaskDialog = ({ add, visible, setVisible }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [taksTitle, setTaskTitle] = useState('')
  const [taksComment, setTaskComment] = useState('')

  const hideDialog = () => setVisible(false);

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
            value={taksTitle}
            onChangeText={setTaskTitle}
          />
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            placeholder='Введите комментарий'
            value={taksComment}
            onChangeText={setTaskComment}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={() => console.log('Ok')}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}


const styles = StyleSheet.create({

  input: {
    margin: 5,
    marginTop: 30,
    fontSize: 12,
  },
});


