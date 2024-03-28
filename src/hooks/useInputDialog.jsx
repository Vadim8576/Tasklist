import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import appStore from "../store/appStore"
import { dialogActions } from "../const/constants"
import authStore from "../store/authStore"



// нельзя использовать символы в идентификторах документов:
// Должны быть допустимые символы UTF-8.
// Должен быть не длиннее 1500 байт.
// Не может содержать косую черту ( / ).
// Не может состоять только из одной точки ( . ) или двойных точек ( .. ).
// Невозможно сопоставить регулярное выражение __.*__
// Максимальный размер документа	1 МиБ (1 048 576 байт)


//  строка не состоит только из одной или двух точек (.) и не содержит символ "/"
// const regex = /^(?!(?:\.|\.{2})$)(?!.*\/).*$/;

export const useInputDialog = (props) => {

  const { type, taskListId = null, taskIndex = null } = props

  const {user} = useAuth()
  const userId = user.uid

  // const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')

  

  const onShowDialog = () => {
    console.log('Show dialog')
   
    if(type === dialogActions.addTaskList) {
      setTitle('')
    }

    if(type === dialogActions.editTaskListTitle) {
      setTitle(taskListId ? appStore.getTaskListTitle(taskListId).title : '')
    }

    if(type === dialogActions.addTask) {
      setTitle('')
      setComment('')
    }

    if(type === dialogActions.editTask) {   
      console.log('edit Task')
      console.log('taskListId = ', taskListId)
      console.log('taskIndex = ', taskIndex)



      const task = appStore.getTaskTitleAndComment(taskListId, taskIndex)
      setTitle(task.title)
      setComment(task.comment)
    }
  }

  

  const hideDialog = () => {   
    console.log('Hide dialog')
    // setVisible(false)
    setTitle('')
    setComment('')
  }


  const onSubmit = () => {
    console.log('onSubmit')

    // const userId = authStore.user.uid
    console.log('Title = ', title)
    console.log('Comment = ', comment)
  
    const trimTitle = title.trim()
    const trimComment = comment.trim()

    if (type === dialogActions.addTaskList) {
      console.log('userId = ', userId)
      console.log('trimTitle = ', trimTitle)
      appStore.addTaskList({ userId, title: trimTitle })
    }
    if (type === dialogActions.editTaskListTitle) {
      appStore.updateTaskList({ taskListId, title: trimTitle })
    }

    if (type === dialogActions.addTask) {
      console.log(title, comment, taskListId)
      
      appStore.addTask({ title: trimTitle, comment: trimComment, taskListId })
    }
    if (type === dialogActions.editTask) {
      appStore.updateTask({ taskIndex, title: trimTitle, comment: trimComment, taskListId })
    }
  }


  useEffect(() => {
    onShowDialog()
  }, [type])


  const value = {
    title,
    setTitle,
    comment,
    setComment,
    hideDialog,
    onSubmit
  }

  return value
}