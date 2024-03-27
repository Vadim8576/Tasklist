import { useMemo } from "react"

export const useListFilter = (list, type) => {


  // console.log('useListFilter = ', list)

  let newList

  if (type === 'NOT_GROUP')
    newList = list.filter(item => !item.groupUsersIds.length > 0 && item)

  if (type === 'GROUP')
    newList = list.filter(item => item.groupUsersIds.length > 0 && item)

  return newList
}