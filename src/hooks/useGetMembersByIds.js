import { useEffect, useMemo, useState } from "react"
import usersStore from "../store/usersStore"

export default useGetMembersByIds = (membersIds) => {
  const [members, setMembers] = useState([])



  console.log('useGetMembersByIds membersIds = ', membersIds)


  if(!membersIds) return {}

  useEffect(() => {
    
    setMembers([])

    const fr = membersIds.map(async id => {
      const fr = await usersStore.getUserById(id)
      setMembers(prev => [...prev, fr])
      // console.log('//////////////////// ', fr)
    })

  }, [membersIds])


  
  return {members}


}