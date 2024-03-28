import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { AuthErrorCodes } from "firebase/auth";
import errorStore from "./errorStore";



class appStore {

  isLoggedIn = false
  // isLoading = false
  taskList = []
  groupTaskList = []
  tasks = {}
  unsubscribeVoid = null

  message = {}


  constructor() {
    makeAutoObservable(this);
    // makeAutoObservable(this, {}, { autoBind: true });
  }

  // setIsLoading = (isLoading) => {
  //   this.isLoggedIn = isLoading
  // }


  setTaskList = (data) => {
    if (!data) return

    // console.log('appStore data = ', data)

    this.taskList = data.map(d => ({
        createdAt: d.createdAt,
        creatorId: d.creatorId,
        taskListId: d.taskListId,
        title: d.title,
        groupUsersIds: d.groupUsersIds
    }))

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


  subscribeToTasks = (userId) => {
    const unsubscribe = fb.taskSnapshot({
      setTaskList: this.setTaskList,
      userId
    })

    return unsubscribe
  }


  setTasks = (data) => {
    this.tasks = data
  }


  addTaskList = (payload) => {
    const { userId, title } = payload
    fb.addTaskList({ userId, title })
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
    console.log(payload)
    fb.removeTask(payload)
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

