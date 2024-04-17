import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";
import { AuthErrorCodes } from "firebase/auth";
import errorStore from "./errorStore";



class appStore {

  isLoggedIn = false
  // isLoading = false
  taskList = []
  groupTaskList = []
  subTaskList = []
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

    // let task = {}
    // data.forEach(taskList => {
    //   task = { ...task, [taskList.taskListId]: taskList.tasks }
    // })

    // this.setTasks(task)

  }


  getTaskListTitle = (id) => {
    const task = this.taskList.filter((item) => item.taskListId === id)
    // console.log('appStore taskList = ',this.taskList)
    // console.log('appStore title = ',title[0])
    return task[0]?.title
  }

  getTaskTitleAndComment = (id) => {

    console.log('getTaskTitleAndComment id = ', id)

    const subTasks = this.subTaskList.filter(task => task.subTaskListId === id)
    const title = subTasks[0]?.title
    const comment = subTasks[0]?.comment
    
    return { title , comment }
  }


  subscribeToTaskList = (userId) => {
    const unsubscribe = fb.taskListSnapshot({
      setTaskList: this.setTaskList,
      userId
    })

    return unsubscribe
  }



  addTaskList = (payload) => {
    fb.addTaskList(payload)
  }

  updateTaskList = (payload) => {
    fb.updateTaskList(payload)
  }


  removeAllTaskList = () => {
    fb.removeAllTaskList()

  }


  removeTaskList = (taskListId) => {
    fb.removeTaskList(taskListId)
  }

  removeSelectedTaskList = async (ids) => {
    await fb.removeSelectedTaskList(ids)
  }





    
  setSubTaskList = (data) => {
    this.subTaskList = data

    console.log('subTaskList.subTaskListId = ', this.subTaskList.subTaskListId)
  }


  subscribeToSubTaskList = (taskListId) => {
    const unsubscribe = fb.subTaskListSnapshot({
      setSubTaskList: this.setSubTaskList,
      taskListId
    })

    return unsubscribe
  }


  addTask = (payload) => {
    fb.addTask(payload)
  }


  updateTask = (payload) => {
    fb.updateTask(payload)
  }


  removeTask = (listId) => {
    console.log('appStore listId = ', listId)
    fb.removeTask(listId)
  }





  // getTaskByIndex = (index) => {
  //   return this.taskList[index]
  // }

}

export default new appStore();

