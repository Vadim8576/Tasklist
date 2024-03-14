import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";


class appStore {

  user = null
  isLoggedIn = false
  taskList = []
  currentTaskList = ''

  constructor() {
    makeAutoObservable(this);
  }


  setCurrentTaskList = (task) => {
    this.currentTaskList = task
  }

  setTaskList = (data) => {
    this.taskList = data;
    console.log('appStore ', this.taskList)
  }

  getTaskList = (userId) => {
    console.log('appStore ID', userId)
    const snapshot = fb.mainTaskListSnapshot({setTaskList: this.setTaskList, userId})
  }

  get tasks () {
    return this.taskList
  }

}

export default new appStore();

