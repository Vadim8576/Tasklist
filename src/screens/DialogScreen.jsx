import { StyleSheet, View } from "react-native";
import { Text, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useInputDialog } from '../hooks/useInputDialog'
import { useEffect, useLayoutEffect, useState } from "react";
import { dateOptions, dialogActions } from "../const/constants";
import CustomInput from "../components/CustomInput";



// export  const dialogActions = {
// 	addTaskList: 'ADD_TASK_LIST',
// 	editTaskListTitle: 'EDIT_TASK_LIST_TITLE',
// 	addTask: 'ADD_TASK',
// 	editTask: 'EDIT_TASK',
// }


export default DialogScreen = observer(({ route, navigation }) => {
  const theme = useTheme()
  const [commentVisible, setCommentVisible] = useState(false)
  const {type, taskListId = null, taskIndex = null, currentListType} = route.params

  const {
    onSubmit,
    title,
    setTitle,
    comment,
    setComment
  } = useInputDialog({ type, taskListId, taskIndex })


  // console.log('dialog type = ', type)
  console.log('currentListType = ', currentListType)

  const now = new Date()

  const onSubmitHandler = () => {
    onSubmit()
    navigation.goBack()
  }

  // опции для AppBar
  useLayoutEffect(() => {
    navigation.setOptions({
      onSubmitButton: true, //кнопка подтверждения действий на скрине в AppBar
      onSubmitHandler // действие по этой кнопке
    })
  }, [title, comment])

  useEffect(() => {
    const visible = type === dialogActions.addTask || type === dialogActions.editTask
    console.log('comment is visible = ',  visible)
    setCommentVisible(visible)
  }, [type])



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{now.toLocaleString('ru', dateOptions)}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <CustomInput
          placeholder='Введите наименование задачи'
          value={title}
          onChangeText={setTitle}
        />
        {commentVisible &&
          <CustomInput
            placeholder='Введите комментарий'
            value={comment}
            onChangeText={setComment}
          />
        }
      </View>
    </View>
  )
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
  inputWrapper: {
    flex: 1,
    padding: 20,
  },
});


