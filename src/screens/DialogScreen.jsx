import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, TextInput, Text } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useInputDialog } from '../hooks/useInputDialog'
import { useLayoutEffect } from "react";
import { dateOptions } from "../const/constants";


export default DialogScreen = observer(({ route, navigation, type }) => {

  const {
    hideDialog,
    onSubmit,
    title,
    setTitle
  } = useInputDialog({ type })

  const now = new Date()


  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      confirm: true
    })
  }, [navigation, title])

  return (
    <View style={styles.container}>
      <View>
        <Text>{now.toLocaleString('ru', dateOptions)}</Text>
      </View>
      <View>
        <TextInput
          multiline={true}
          numberOfLines={3}
          style={styles.input}
          placeholder='Введите наименование задачи'
          value={title}
          onChangeText={setTitle}
        />
        
      </View>

    </View>
  )

  // return (
  //   <Portal>
  //     <Dialog visible={visible} onDismiss={hideDialog}>
  //       <Dialog.Content>
  //         <Text variant="bodyMedium">Добавить задачу</Text>
  //         <TextInput
  //           multiline={true}
  //           numberOfLines={2}
  //           style={styles.input}
  //           placeholder='Введите наименование задачи'
  //           value={title}
  //           onChangeText={setTitle}
  //         />
  //       </Dialog.Content>
  //       <Dialog.Actions>
  //         <Button onPress={() => {
  //           hideDialog()
  //           setVisible(false)
  //         }}>Cancel</Button>
  //         <Button onPress={() => {
  //           onSubmit()
  //           setVisible(false)
  //         }}>Ok</Button>
  //       </Dialog.Actions>
  //     </Dialog>
  //   </Portal>
  // );
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
  },
  input: {
    margin: 5,
    marginTop: 30,
    fontSize: 16,
  },
});


