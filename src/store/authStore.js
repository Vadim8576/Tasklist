import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { logOut } from '../api/firebase'



class Auth {

  user = {};
  friends = []
  foundFriend = {}
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user) => {
    this.user = user
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

  createUser = () => {
    fb.createUser()
  }

  resetFriends = () => {
    this.friends= []
  }

  getFriends = (userId) => {
    this.resetFriends()
    fb.getFriends({userId, setFriends: this.setFriends})
  }

  setFriends = (friend) => {
    console.log('authStore friend = ', friend)
    this.friends = [...this.friends, friend]
  }

  getFriendById = async  (friendId) => {
    this.setFoundFriend({})
    this.setFoundFriend(await fb.getFriendById(friendId || {}))
  }

  setFoundFriend = (foundFriend) => {
    this.foundFriend = foundFriend
  }

  addFriend = async (ids) => {
    await fb.addFriend(ids)
    this.getFriends(ids.userId)
    this.setFoundFriend({})
  }

}

export default new Auth();

