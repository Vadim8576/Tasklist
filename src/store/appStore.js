import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";


class appStore {

  user = null;
  isLoggedIn = false;
  taskList = []

  constructor() {
    makeAutoObservable(this);
  }

  setTaskList = (data) => {
    this.taskList = data;
    console.log('taskList = ', this.taskList)
  }

  getTaskList = () => {
    const snapshot = fb.snapshot(this.setTaskList)
    
    return snapshot
  }


}

export default new appStore();

