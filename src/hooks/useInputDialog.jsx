import { useEffect, useState, useMemo } from "react"
import { useAuth } from "./useAuth"
import appStore from "../store/appStore"
import { dialogActions } from "../const/constants"
import authStore from "../store/authStore"
import { getFBCollectionId } from "../helpers/getFBCollectionId"



// нельзя использовать символы в идентификторах документов:
// Должны быть допустимые символы UTF-8.
// Должен быть не длиннее 1500 байт.
// Не может содержать косую черту ( / ).
// Не может состоять только из одной точки ( . ) или двойных точек ( .. ).
// Невозможно сопоставить регулярное выражение __.*__
// Максимальный размер документа	1 МиБ (1 048 576 байт)


//  строка не состоит только из одной или двух точек (.) и не содержит символ "/"
// const regex = /^(?!(?:\.|\.{2})$)(?!.*\/).*$/;




export const useInputDialog = (payload) => {

  const { type, listId = null} = payload



  console.log('useInputDialog type, listId = ', type, listId)



  const {user} = useAuth()
  const userId = user.uid

  // const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [createdAt, setCreatedAt] = useState(null)

  

  const onShowDialog = () => {
    console.log('Show dialog')
   
    if(type === dialogActions.addTaskList || type === dialogActions.addGroupList) {
      setTitle('')
    }

    if(type === dialogActions.editTaskListTitle) {
      setTitle(listId ? appStore.getTaskListTitle(listId) : '')
     
    }

    if(type === dialogActions.editGroupTaskListTitle) {
      setTitle(listId ? appStore.getGroupTaskListTitle(listId) : '')
     
    }

    if(type === dialogActions.addTask) {
      setTitle('')
      setComment('')
    }

    if(type === dialogActions.editTask) {   
      console.log('edit Task')
      console.log('listId = ', listId)

      const task = appStore.getTaskTitleAndComment(listId)
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

    console.log('Title = ', title)
    console.log('Comment = ', comment)
    console.log('type = ', type)
  
    const trimTitle = title.trim()
    const trimComment = comment.trim()

    if (type === dialogActions.addTaskList || type === dialogActions.addGroupList) {
      if(trimTitle === '') return


      appStore.addTaskList({
        userId,
        title: trimTitle,
        createdAt,
        collectionId: getFBCollectionId(type)
      })
    }

    if (type === dialogActions.editTaskListTitle || type === dialogActions.editGroupTaskListTitle) {
      appStore.updateTaskList({
        listId,
        title: trimTitle,
        collectionId: getFBCollectionId(type)
      })
    }






    if (type === dialogActions.addTask) {
      console.log(title, comment, listId)
      
      if(trimTitle === '') return
      appStore.addTask({ title: trimTitle, comment: trimComment, listId })
    }
    if (type === dialogActions.editTask) {
      appStore.updateTask({ title: trimTitle, comment: trimComment, listId })
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
    onSubmit,
    createdAt,
    setCreatedAt
  }

  return useMemo (() => value, [value])
}