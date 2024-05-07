import { useEffect, useState } from "react"
import friendsStore from "../store/friendsStore"

export default useGetFriendById = (groupUsersIds) => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const fr = groupUsersIds.map(async id => {
      const fr = await friendsStore.getFriendById(id)
      setFriends(prev => [...prev, fr])
      // console.log('//////////////////// ', fr)
    })

  }, [groupUsersIds])
   
  return {friends}
}