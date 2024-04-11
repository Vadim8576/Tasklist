import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { logOut } from '../api/firebase'



class Auth {

  user = {}
  newUserCreated = 'no' // 'yes', 'no' или 'error'
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

}

export default new Auth();

