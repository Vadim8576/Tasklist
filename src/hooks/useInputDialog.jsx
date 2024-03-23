import { useEffect, useId, useMemo, useState } from "react"
import { useAuth } from "./useAuth"
import appStore from "../store/appStore"
import { dialogActions } from "../const/constants"



export const useInputDialog = (props) => {

  const { type, taskListId, taskIndex = null } = props
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')


  const { user } = useAuth()
  const userId = user.uid

  // const id = useId()
  // console.log('id = ', id)


  // const showDialog = (title = '') => {
  const showDialog = () => {
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

      const task = appStore.getTaskTitleAndComment(taskListId, taskIndex)

      setTitle(task.title)
      setComment(task.comment)
    }
 
    
    
    setVisible(true)
  }

  const hideDialog = () => {
    
    console.log('Hide dialog')
    setVisible(false)
    setTitle('')
    setComment('')
  }


  const onSubmit = () => {
    console.log('onSubmit')

    if (type === dialogActions.addTaskList) {
      appStore.addTaskList({ userId, title })
    }
    if (type === dialogActions.editTaskListTitle) {
      appStore.updateTaskList({ taskListId, title })
    }

    if (type === dialogActions.addTask) {
      console.log(title, comment, taskListId)
      
      appStore.addTask({ title, comment, taskListId })
    }
    if (type === dialogActions.editTask) {
      appStore.updateTask({ taskIndex, title, comment, taskListId })
    }

    hideDialog()
  }


  const value = {
    title,
    setTitle,
    comment,
    setComment,
    showDialog,
    hideDialog,
    onSubmit,
    visible
  }

  // return useMemo(() => value, [])
  return value

}