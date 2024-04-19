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

  const [idsOfSelectedItems, setIdsOfSelectedItems] = useState([])
  const [selectionMode, setSelectionMode] = useState(false)

  const getOptions = (listId) => ({
    'TASK_LIST': {
      type: dialogActions.editTaskListTitle,
      listId,
      remove: () => appStore.removeTaskList(listId),
      removeSelected: () => appStore.removeSelectedTaskList(idsOfSelectedItems)
    },
    'SUB_TASK_LIST': {
      type: dialogActions.editTask,
      listId,
      remove: () => appStore.removeTask(listId),
      removeSelected: () => appStore.removeSelectedTask(idsOfSelectedItems)
    }
  })


  useEffect(() => {
    if (!buttonGroupIsOpen) setCurrentList(state => ({ ...state, id: null }))
  }, [buttonGroupIsOpen])





  useEffect(() => {
    console.log(idsOfSelectedItems, idsOfSelectedItems.length)

    if (idsOfSelectedItems.length === 1) {
      setCurrentList(state => ({ ...state, id: idsOfSelectedItems[0] }))
    }
  }, [idsOfSelectedItems])






  const buttonGroup = {
    buttonVisible: !errorStore.message.isError && !errorStore.message.isSuccess,


    idsOfSelectedItems,


    setIdsOfSelectedItems,


    selectionMode,


    setSelectionMode,


    show: () => setButtonGroupIsOpen(true),


    hide: () => setButtonGroupIsOpen(false),


    buttonGroupIsOpen,


    checkboxOnChange: () => {
    },


    clearSelection: () => {
      setIdsOfSelectedItems([])
    },

    getSelected: (id) => {

      for (let i = 0; i < idsOfSelectedItems?.length; i++) {
        if (idsOfSelectedItems[i] === id) return true
      }
  
      return false
    },

    edit: () => {
      console.log('edit currentList.id = ', currentList.id)
      const { remove, removeSelected, ...otherOptions } = getOptions(currentList.id)[currentList.name]
      navigation.navigate('DialogScreen', otherOptions)
    },


    remove: () => {
      console.log('Удалить: ', currentList.id)
      getOptions(currentList.id)[currentList.name].remove()
    },
    

    removeSelected: () => {
      console.log('Удалить: ', idsOfSelectedItems)
      getOptions(currentList.id)[currentList.name].removeSelected()
    },


    onPressItem: (item) => {
      if (idsOfSelectedItems.length > 0) {

        const key = currentList.name === 'SUB_TASK_LIST' ? 'subTaskListId' : 'taskListId'
        if (idsOfSelectedItems.includes(item[key])) {
          setIdsOfSelectedItems(items => items.filter((id) => id !== item[key]))
          return
        }
        setIdsOfSelectedItems(items => [...items, item[key]])
        return
      }

      if(currentList.name === 'SUB_TASK_LIST') {
        // нажал на subtask
        return
      }

      navigation.navigate(
        'SubTaskList', {
        taskList: item
      })
    },


    onLongPressItem: (listId) => {
      if (idsOfSelectedItems.length === 0) {
        setIdsOfSelectedItems([listId])
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
    idsOfSelectedItems
  ])
}