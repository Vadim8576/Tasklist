import { StyleSheet, View } from "react-native";
import { Text, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useInputDialog } from '../hooks/useInputDialog'
import { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const { type, listId = null } = route.params



  const {
    onSubmit,
    title,
    setTitle,
    comment,
    setComment,
    createdAt,
    setCreatedAt
  } = useInputDialog({ type, listId })


 

  const onSubmitHandler = () => {
    if (title === '') return
    onSubmit()
    navigation.goBack()
  }

  // опции для AppBar
  useLayoutEffect(() => {
    navigation.setOptions({
      onSubmitButton: true, //кнопка подтверждения действий на скрине в AppBar
      onSubmitHandler, // действие по этой кнопке
      title: commentVisible ? 'Добавить задачу' : 'Добавить список задач'
    })
  }, [title, comment, commentVisible])

  useLayoutEffect(() => {
    const visible = type === dialogActions.addTask || type === dialogActions.editTask
    console.log('comment is visible = ', visible)
    setCommentVisible(visible)
  }, [type])



  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCreatedAt(now)
    }, 1000)

    return () => clearInterval(timer)
  }, [])



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{createdAt?.toLocaleString('ru', dateOptions)}</Text>
      </View>
      <View style={styles.inputWrapper}>
        {/* <Text style={styles.title}>Заголовок</Text> */}
        <CustomInput
          autoFocus
          placeholder='Введите заголовок задачи'
          value={title}
          onChangeText={setTitle}
          multiline={true}
          numberOfLines={5}
        />
        {commentVisible &&
          <>
            {/* <Text style={styles.title}>Комментарий</Text> */}
            <CustomInput
              placeholder='Введите комментарий'
              value={comment}
              onChangeText={setComment}
              multiline={true}
              numberOfLines={5}
            />
          </>
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
    // borderBottomWidth: 1,
    padding: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    // fontWeight: 'bold'
  },
  text: {
    fontSize: 30,
  },
  inputWrapper: {
    flex: 1,
    padding: 20,
  },
});


