import { useMemo } from "react"
import usersStore from "../store/usersStore"

export const useSeachFavoriteUser = (favoriteUsers) => { 

  const getFavoriteUser = async (ids) => {

    const {friendId, userId } = ids

    let error = ''

    if (friendId === userId) {
      error = 'Это ваш ID!'
      return [null, error]
    }

    const len = favoriteUsers.filter(user => user.id === friendId).length

    if (len > 0) {
      error = 'Пользователь с этим ID уже есть в списке друзей!'
      return [null, error]
    }

    const friend = await usersStore.getUserById(friendId)
    if (friend === null) {
      error = 'Пользователь с таким ID не существует!'
      return [null, error]
    }

    error = ''
    
    return [friend, error]
  }

  const value = {
    getFavoriteUser
  }

  return useMemo(() => value, [favoriteUsers])
}