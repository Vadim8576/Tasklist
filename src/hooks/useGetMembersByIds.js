import { useEffect, useMemo, useState } from "react"
import usersStore from "../store/usersStore"

export default useGetMembersByIds = (groupUsersIds) => {
  const [members, setMembers] = useState([])


  console.log('useGetMembersByIds groupUsersIds = ', groupUsersIds)

  useEffect(() => {
    setMembers([])
    const fr = groupUsersIds.map(async id => {
      const fr = await usersStore.getUserById(id)
      setMembers(prev => [...prev, fr])
      // console.log('//////////////////// ', fr)
    })

  }, [groupUsersIds])


  
  return {members}


}