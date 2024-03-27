import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput, Text } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useInputDialog } from "../../hooks/useInputDialog";


export default InputDialog = observer(({
  visible, type, setVisible
}) => {

  const {
    hideDialog,
    onSubmit,
    title,
    setTitle
  } = useInputDialog({ type })

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


