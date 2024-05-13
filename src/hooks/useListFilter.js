import { useEffect, useMemo, useState } from "react"


export const useListFilter = (list, screenName) => {

  const [newList, setNewList] = useState([]);

  useEffect(() => {
    if (screenName === 'TaskList') {
      setNewList(
        list.filter(
          item => !item.groupUsersIds.length > 0 && item)
      )
    }

    if (screenName === 'GroupTaskList') {
      setNewList(
        list.filter(
          item => item.groupUsersIds.length > 0 && item)
      )
    }

  }, [list, screenName])


  // console.log('newList.groupUsersIds = ', newList.groupUsersIds)


  const values = { list, screenName }

  // return useMemo(() => newList, [list, screenName])
  return useMemo(() => newList, [values])
}