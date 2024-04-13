import { useMemo } from "react"
import errorStore from "../store/errorStore"
import { dialogActions } from "../const/constants"
import appStore from "../store/appStore"

export const useGroupButton = (payload) => {

  const { navigation, type, listId = null, currentListName } = payload

  const addButtonVisible = !errorStore.message.isError && !errorStore.message.isSuccess


  const getOptions = (listId) => ({
    'TASK_LIST': {
      type: dialogActions.editTaskListTitle,
      listId,
      remove: () => appStore.removeTaskList(listId)
    },
    'SUB_TASK_LIST': {
      type: dialogActions.editTask,
      listId,
      remove: () => appStore.removeTask(listId)
    }
  })



  const checkboxChange = () => {


  }

  const edit = (currentListId) => {
    const { remove, ...otherOptions } = getOptions(currentListId)[currentListName]
    navigation.navigate('DialogScreen', otherOptions)

  }

  const remove = (currentListId) => {
    getOptions(currentListId)[currentListName].remove()
  }





  addTask = () => {
    navigation.navigate(
      'DialogScreen', {
      type,
      listId
    })
  }


  const values = {
    addButtonVisible,
    checkboxChange,
    addTask,
    edit,
    remove
  }

  return useMemo(() => values, [type, listId])
}