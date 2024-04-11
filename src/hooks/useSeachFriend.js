import { useMemo } from "react"
import friendsStore from "../store/friendsStore"

export const useSeachFriend = (friends) => { 

  const getFriend = async (ids) => {

    const {friendId, userId } = ids

    let error = ''

    if (friendId === userId) {
      error = 'Это ваш ID!'
      return [null, error]
    }

    const len = friends.filter(friend => friend.id === friendId).length

    if (len > 0) {
      error = 'Пользователь с этим ID уже есть в списке друзей!'
      return [null, error]
    }

    const friend = await friendsStore.getFriendById(friendId)
    if (friend === null) {
      error = 'Пользователь с таким ID не существует!'
      return [null, error]
    }

    error = ''
    
    return [friend, error]
  }

  const value = {
    getFriend
  }

  return useMemo(() => value, [friends])
}