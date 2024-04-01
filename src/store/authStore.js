import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { logOut } from '../api/firebase'



class Auth {

  user = {};
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

  singIn = (email, password) => {
    fb.singIn(email, password)
  }

  logout = () => {
    logOut()
  }

  setLoggedIn = (bool) => {
    this.isLoggedIn = bool
  }

  getUsers = () => {
    fb.getUsers()
  }

}

export default new Auth();

