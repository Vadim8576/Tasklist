import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { logOut } from '../api/firebase'
import { onAuthStateChanged } from "firebase/auth";


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

  getTaskList = () => {
   fb.snapshot()
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

  setUser = (user) => {
    this.user = user
  }

}

export default new Auth();

