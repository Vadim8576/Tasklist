import { useEffect, useState } from "react"
import friendsStore from "../store/friendsStore"

export default useGetFriendById = (groupUsersIds) => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    (async () => {
      const fr = await groupUsersIds.map(async id => {
        const fr = await friendsStore.getFriendById(id)
        setFriends(prev => [...prev, fr])
      })
    })()
  }, [groupUsersIds])


  return {friends}

}