import { useEffect, useMemo, useState } from "react"
import { tabType } from "../const/constants"

export const useListFilter = (list, currentListType) => {

  const [newList, setNewList] = useState();

  useEffect(() => {
    if (currentListType === tabType.taskList) {
      setNewList(
        list.filter(
          item => !item.groupUsersIds.length > 0 && item)
      )
    }

    if (currentListType === tabType.groupTaskList) {
      setNewList(
        list.filter(
          item => item.groupUsersIds.length > 0 && item)
      )
    }

  }, [list, currentListType])


  return newList
}