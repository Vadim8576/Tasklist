import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";



class UsersStore {

  
  favoriteUsers = []
  foundFavoriteUser = null

  constructor() {
    makeAutoObservable(this)
  }


  // resetFriends = () => {
  //   this.favoriteUsers= []
  // }

  getFavoriteUsers = async (userId) => {
    // this.resetFriends()
    this.setFavoriteUsers(await fb.getFavoriteUsers(userId))
  }

  setFavoriteUsers = (favoriteUsers) => {
    // console.log('authStore favoriteUsers = ', favoriteUsers)
    this.favoriteUsers = favoriteUsers
    // this.favoriteUsers = [...this.favoriteUsers, favoriteUsers]
  }

  getUserById = async (friendId) => {
    
    const ff = await fb.getUserById(friendId)
    this.setFoundUser(ff)
    
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', ff)
    
    return ff
  }

  setFoundUser= (foundFavoriteUser) => {
    this.foundFavoriteUser = foundFavoriteUser
  }

  addFavoriteUser = async (ids) => {
    await fb.addFavoriteUser(ids)
    console.log('после firebase addFavoriteUser')
    this.getFavoriteUsers(ids.userId)
    this.setFoundUser(null)
  }

  removeFriend = async (ids) => {
    await fb.removeFriend(ids)
    this.getFavoriteUsers(ids.userId)
  }

}

export default new UsersStore();

