import { useMemo, useState } from "react"

export default useFavoriteUsersFilter = (members, favoriteUsers) => {
  // const [newFavoriteUsers, setNewFavoriteUsers] = useState([])

  console.log('useFavoriteUsersFilter!!!!!!!!!!!!!!!!!!!!!!!')

  const filter = useMemo(() => {

    if(members.length === 0 || favoriteUsers.length === 0) return favoriteUsers

    const membersIds = members.map((member) => member.id)


    const newFavoriteUsers = favoriteUsers.filter((favoriteUser) => {
      return !membersIds.includes(favoriteUser.id)
    })

    // console.log('members = ', members)
    // console.log('favoriteUsers = ', favoriteUsers)
    // console.log('FILTER = ', newFavoriteUsers)

    return newFavoriteUsers
  }, [members, favoriteUsers])

  return filter

}