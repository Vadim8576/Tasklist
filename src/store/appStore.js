import { makeAutoObservable, autorun } from "mobx";
import { fb } from "../api/firebase";


class appStore {

  user = null
  isLoggedIn = false
  taskList = []
  
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTaskList = (data) => {
    this.taskList = [...data];
    // console.log('appStore ', this.taskList)
    console.log('appStore ', this.taskList[0].subTask)
  }

  getTaskList = (userId) => {
    console.log('appStore ID', userId)
    const snapshot = fb.mainTaskListSnapshot({
      setTaskList: this.setTaskList,
      userId
    })
  }

  getTaskByIndex = (index) => {
    return this.taskList[index]
  }

}

export default new appStore();

