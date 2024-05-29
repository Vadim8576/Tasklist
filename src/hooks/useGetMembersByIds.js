import { useEffect, useMemo, useState } from "react"
import usersStore from "../store/usersStore"


export default useGetMembersByIds = (membersIds) => {
  const [members, setMembers] = useState([])

  useEffect(() => {

    if (!membersIds) setMembers([])
    const getMembers = async () => {
      const members = await usersStore.getMembersById(membersIds)
      setMembers(members)
    }

    getMembers()

  }, [membersIds])


  // console.log('useGetMembersByIds members = ', members)

  return members

}

