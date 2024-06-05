import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";



class UsersStore {


  favoriteUsers = []
  members = []

  foundFavoriteUser = null

  constructor() {
    makeAutoObservable(this)
  }



  getFavoriteUsers = async (userId) => {
    const favoriteUsers = await fb.getFavoriteUsers(userId)
    this.setFavoriteUsers(favoriteUsers)

    return favoriteUsers
  }


  setFavoriteUsers = (favoriteUsers) => {
    this.favoriteUsers = favoriteUsers
  }



  setMembers = (members) => {
    this.members = members
  }



  getMembersById = async (ids) => {
    const members = await fb.getMembersById(ids)

    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!getUsersById members', members)

    this.setMembers(members)
    return members
  }



  setFoundUser = (foundFavoriteUser) => {
    this.foundFavoriteUser = foundFavoriteUser
  }

  addFavoriteUser = async (ids) => {
    await fb.addFavoriteUser(ids)
    console.log('после firebase addFavoriteUser')
    this.getFavoriteUsers(ids.userId)
    this.setFoundUser(null)
  }

  removeFavoriteUser = async (ids) => {
    await fb.removeFavoriteUser(ids)
    this.getFavoriteUsers(ids.userId)
  }







}

export default new UsersStore();

