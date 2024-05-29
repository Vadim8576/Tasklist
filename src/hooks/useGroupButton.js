import { useEffect, useMemo, useState } from "react"
import errorStore from "../store/errorStore"
import { dialogActions } from "../const/constants"
import appStore from "../store/appStore"
import { getFBCollectionId } from "../helpers/getFBCollectionId"



const getCurrentList = (actionType) => {
  if(actionType === dialogActions.addTaskList) return 'TASK_LIST'
  if(actionType === dialogActions.addGroupList) return 'GROUPE_LIST'
  return 'SUB_TASK_LIST'
}





export const useGroupButton = (payload) => {

  const { navigation, actionType, listId = null } = payload

  const [buttonGroupIsOpen, setButtonGroupIsOpen] = useState(false)
  const [currentList, setCurrentList] = useState({
    name: getCurrentList(actionType), id: null
  })

  const [selectedItemsIds, setIdsOfSelectedItems] = useState([])
  const [selectionMode, setSelectionMode] = useState(false)

  const getOptions = (listId) => ({
    'TASK_LIST': {
      actionType: actionType === dialogActions.addTaskList ? dialogActions.editTaskListTitle : dialogActions.editGroupTaskListTitle,
      listId,
      remove: () => appStore.removeTaskList({listId, collectionId: getFBCollectionId(actionType)}),
      removeSelected: () => appStore.removeSelectedTaskList({
        selectedItemsIds,
        collectionId: getFBCollectionId(actionType)
      })
    },
    'SUB_TASK_LIST': {
      actionType: dialogActions.editTask,
      listId,
      remove: () => appStore.removeTask(listId),
      removeSelected: () => appStore.removeSelectedTask(selectedItemsIds)
    }
  })


  useEffect(() => {
    if (!buttonGroupIsOpen) setCurrentList(state => ({ ...state, id: null }))
  }, [buttonGroupIsOpen])





  useEffect(() => {
    console.log(selectedItemsIds, selectedItemsIds.length)

    if (selectedItemsIds.length === 1) {
      setCurrentList(state => ({ ...state, id: selectedItemsIds[0] }))
    }
  }, [selectedItemsIds])



  useEffect(() => {
    console.log('currentList = ', currentList.name)
  }, [currentList])




  const buttonGroup = {
    buttonVisible: !errorStore.message.isError && !errorStore.message.isSuccess,

    currentList,


    selectedItemsIds,


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

      for (let i = 0; i < selectedItemsIds?.length; i++) {
        if (selectedItemsIds[i] === id) return true
      }
  
      return false
    },

    edit: () => {
      console.log('edit currentList.id = ', currentList.id)
      console.log('edit currentList.name = ', currentList.name)
      const { remove, removeSelected, ...otherOptions } = getOptions(currentList.id)[currentList.name === 'GROUPE_LIST' ? 'TASK_LIST' : currentList.name]
      navigation.navigate('DialogScreen', otherOptions)
    },


    remove: () => {
      console.log('Удалить: ', currentList.id)
      getOptions(currentList.id)[currentList.name === 'GROUPE_LIST' ? 'TASK_LIST' : currentList.name].remove()
    },
    

    removeSelected: () => {
      console.log('Удалить: ', selectedItemsIds)
      getOptions(currentList.id)[currentList.name === 'GROUPE_LIST' ? 'TASK_LIST' : currentList.name].removeSelected()
    },


    onPressItem: (item) => {
      if (selectedItemsIds.length > 0) {

        const key = currentList.name === 'SUB_TASK_LIST' ? 'subTaskListId' : 'taskListId'
        if (selectedItemsIds.includes(item[key])) {
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
      if (selectedItemsIds.length === 0) {
        setIdsOfSelectedItems([listId])
      }
      setCurrentList(state => ({ ...state, id: listId }))
    },


    addTask: () => {
      navigation.navigate(
        'DialogScreen', {
        actionType,
        listId
      })
    },

    currentListId: currentList.id,

  }


  const values = {
    buttonGroup
  }

  return useMemo(() => values, [
    actionType,
    listId,
    buttonGroup.buttonGroupIsOpen,
    currentList.id,
    selectedItemsIds
  ])
}