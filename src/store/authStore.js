import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { logOut } from '../api/firebase'



class Auth {

  user = {};
  friends = []
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

  

  setFriends = (friends) => {
    console.log('authStore friends = ', friends)
    this.friends = [...this.friends, friends]
  }

}

export default new Auth();

