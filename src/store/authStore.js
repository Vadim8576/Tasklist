import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { logOut } from '../api/firebase'



class Auth {

  user = {};
  
  newUserCreated = 'no' // 'yes', 'no' или 'error'
  friends = []
  foundFriend = null
  isLoggedIn = false

  constructor() {
    makeAutoObservable(this)
  }

  setUser = (user) => {
    this.user = user
  }

  setNewUserCreated = (created) => {
    this.newUserCreated = created
  }

  setError = (error) => {
    this.authError = error;
  }

  singIn = async (email, password) => {
    await fb.singIn(email, password)
  }

  logout = () => {
    logOut()
  }

  setLoggedIn = (bool) => {
    this.isLoggedIn = bool
  }

  createUser = ({email, password, nickName}) => {
    fb.createUser({email, password, nickName, setNewUserCreated: this.setNewUserCreated})
  }

  resetFriends = () => {
    this.friends= []
  }

  getFriends = async (userId) => {
    // this.resetFriends()
    this.setFriends(await fb.getFriends(userId))
  }

  setFriends = (friend) => {
    console.log('authStore friend = ', friend)
    this.friends = friend
    // this.friends = [...this.friends, friend]
  }

  getFriendById = async  (friendId) => {
    // this.setFoundFriend({})
    this.setFoundFriend(await fb.getFriendById(friendId))
    return this.foundFriend
  }

  setFoundFriend = (foundFriend) => {
    this.foundFriend = foundFriend
  }

  addFriend = async (ids) => {
    await fb.addFriend(ids)
    console.log('после firebase addFriend')
    this.getFriends(ids.userId)
    this.setFoundFriend(null)
  }

  removeFriend = async (ids) => {
    await fb.removeFriend(ids)
    this.getFriends(ids.userId)
  }

}

export default new Auth();

