import { useEffect, useState } from "react"
import usersStore from "../store/usersStore"

export default useGetMemberById = (groupUsersIds) => {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fr = groupUsersIds.map(async id => {
      const fr = await usersStore.getUserById(id)
      setMembers(prev => [...prev, fr])
      // console.log('//////////////////// ', fr)
    })

  }, [groupUsersIds])
   
  return {members}
}