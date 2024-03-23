import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { AuthErrorCodes } from "firebase/auth";
import errorStore from "./errorStore";



class appStore {

  user = null
  isLoggedIn = false
  taskList = []
  tasks = {}
  unsubscribeVoid = null

  message = {}


  constructor() {
    makeAutoObservable(this);
    // makeAutoObservable(this, {}, { autoBind: true });
  }


  setTaskList = (data) => {
    if (!data) return
    this.taskList = data.map(d => ({
      createdAt: d.createdAt,
      creatorId: d.creatorId,
      taskListId: d.taskListId,
      title: d.title
    }))

    // console.log('appStore taskList ', this.taskList)
    let task = {}
    data.forEach(taskList => {
      task = { ...task, [taskList.taskListId]: taskList.tasks }
    })

    this.setTasks(task)
  }



  getTaskListTitle = (id) => {
    const title = this.taskList.filter((item) => item.taskListId === id)
    // console.log('appStore taskList = ',this.taskList)
    // console.log('appStore title = ',title)
    return title[0]
  }

  getTaskTitleAndComment = (taskListId, taskIndex) => {


    const title = this.tasks[taskListId][taskIndex].title
    const comment = this.tasks[taskListId][taskIndex].comment
    // const title = this.tasks[taskListId][index].title
    // const comment = this.tasks[taskListId][index].comment


    console.log('appStore title = ', title)
    console.log('appStore comment = ', comment)
    console.log('appStore index = ', taskIndex)
    return { title, comment }
  }



  fetchTasks = (userId) => {
    const unsubscribeVoid = fb.taskSnapshot({
      setTaskList: this.setTaskList,
      userId
    })

    this.setUnsubscribeVoid(unsubscribeVoid)
  }


  setTasks = (data) => {
    this.tasks = data
  }



  addTaskList = (payload) => {
    const { userId, title } = payload
    try{
      fb.addTaskList({ userId, title })
      // errorStore.setSuccessMessage()
    }
    catch(error) {
      // errorStore.setErrorMessage()
    }

    
  }

  updateTaskList = (payload) => {
    fb.updateTaskList(payload)
  }

  addTask = (payload) => {
    fb.addTask(payload)
  }


  updateTask = (payload) => {
    fb.updateTask(payload)
  }


  removeTask = (payload) => {
    fb.removeTask(payload)
  }




  setUnsubscribeVoid = (unsubscribe) => {
    this.unsubscribeVoid = unsubscribe
  }

  removeAllTaskList = () => {
    fb.removeAllTaskList()

  }


  removeTaskList = (taskListId) => {
    fb.removeTaskList(taskListId)
  }



  // getTaskByIndex = (index) => {
  //   return this.taskList[index]
  // }

}

export default new appStore();

