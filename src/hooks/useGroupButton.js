import { useEffect, useMemo, useState } from "react"
import errorStore from "../store/errorStore"
import { dialogActions } from "../const/constants"
import appStore from "../store/appStore"
import { remove } from "mobx"

export const useGroupButton = (payload) => {

  const { navigation, type, listId = null } = payload

  const [buttonGroupIsOpen, setButtonGroupIsOpen] = useState(false)
  const [currentList, setCurrentList] = useState({
    name: type === 'ADD_TASK_LIST' ? 'TASK_LIST' : 'SUB_TASK_LIST', id: null
  })

  const [idOfSelectedItems, setIdOfSelectedItems] = useState([])
  const [selectionMode, setSelectionMode] = useState(false)

  const getOptions = (listId) => ({
    'TASK_LIST': {
      type: dialogActions.editTaskListTitle,
      listId,
      remove: () => appStore.removeTaskList(listId),
      removeSelectedTaskList: () => appStore.removeSelectedTaskList(idOfSelectedItems)
    },
    'SUB_TASK_LIST': {
      type: dialogActions.editTask,
      listId,
      remove: () => appStore.removeTask(listId)
    }
  })


  useEffect(() => {
    if (!buttonGroupIsOpen) setCurrentList(state => ({ ...state, id: null }))
  }, [buttonGroupIsOpen])





  useEffect(() => {
    console.log(idOfSelectedItems, idOfSelectedItems.length)

    if (idOfSelectedItems.length === 1) {
      setCurrentList(state => ({ ...state, id: idOfSelectedItems[0] }))
    }
  }, [idOfSelectedItems])






  const buttonGroup = {
    buttonVisible: !errorStore.message.isError && !errorStore.message.isSuccess,


    idOfSelectedItems,


    setIdOfSelectedItems,


    selectionMode,


    setSelectionMode,


    show: () => setButtonGroupIsOpen(true),


    hide: () => setButtonGroupIsOpen(false),


    buttonGroupIsOpen,


    checkboxOnChange: () => {
    },


    clearSelection: () => {
      setIdOfSelectedItems([])
    },


    edit: () => {
      console.log('edit currentList.id = ', currentList.id)
      const { remove, removeSelectedTaskList, ...otherOptions } = getOptions(currentList.id)[currentList.name]
      navigation.navigate('DialogScreen', otherOptions)
    },


    remove: () => {
      console.log('Удалить: ', currentList.id)
      getOptions(currentList.id)[currentList.name].remove()
    },
    

    removeSelectedTaskList: () => {
      console.log('Удалить: ', idOfSelectedItems)
      getOptions(currentList.id)[currentList.name].removeSelectedTaskList()
    },


    onPressItem: (item) => {
      if (idOfSelectedItems.length > 0) {
        if (idOfSelectedItems.includes(item.taskListId)) {
          setIdOfSelectedItems(items => items.filter((id) => id !== item.taskListId))
          return
        }
        setIdOfSelectedItems(items => [...items, item.taskListId])
        return
      }
      navigation.navigate(
        'SubTaskList', {
        taskList: item
      })
    },


    onLongPressItem: (listId) => {
      if (idOfSelectedItems.length === 0) {
        setIdOfSelectedItems([listId])
      }
      setCurrentList(state => ({ ...state, id: listId }))
    },


    addTask: () => {
      navigation.navigate(
        'DialogScreen', {
        type,
        listId
      })
    },

    currentListId: currentList.id,

  }


  const values = {
    buttonGroup
  }

  return useMemo(() => values, [
    type,
    listId,
    buttonGroup.buttonGroupIsOpen,
    currentList.id,
    idOfSelectedItems
  ])
}