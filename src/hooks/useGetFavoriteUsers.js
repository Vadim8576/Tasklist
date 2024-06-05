import { useEffect, useState } from "react"
import usersStore from "../store/usersStore"


export default useGetFavoriteUsers = (userId) => {
  const [favoriteUsers, setFavoriteUsers] = useState([])

  useEffect(() => {

    if (!userId) setFavoriteUsers([])
    const getFavoriteUsers = async () => {
      const favoriteUsers = await usersStore.getFavoriteUsers(userId)
      setFavoriteUsers(favoriteUsers)
    }

    getFavoriteUsers()

  }, [userId])


  // console.log('useGetFavoriteUsers favoriteUsers = ', favoriteUsers)

  return favoriteUsers

}

