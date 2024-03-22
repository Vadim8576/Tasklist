import { makeAutoObservable, autorun } from "mobx";
import { fb } from "../api/firebase";
import { findNodeHandle } from "react-native";


class appStore {

  user = null
  isLoggedIn = false
  mainTaskList = []
  subTasks = {}
  unsubscribeVoid =null

  constructor() {
    makeAutoObservable(this);
    // makeAutoObservable(this, {}, { autoBind: true });
  }

  setMainTaskList = (data) => {
    if(!data) return
    this.mainTaskList = data.map(d => ({
      createdAt: d.createdAt,
      creatorId: d.creatorId,
      mainTaskId: d.mainTaskId,
      title: d.title
    }))
      
    // console.log('appStore mainTaskList ', this.mainTaskList)
    let task = {}
    data.forEach((mainTask, index) => {
      task = {...task, [mainTask.mainTaskId]: mainTask.subTasks}
    })

    this.setSubTasks(task)
  }

  

  getMainTaskTitle = (id) => {
    const title = this.mainTaskList.filter((item) => item.mainTaskId === id)
    // console.log('appStore mainTaskList = ',this.mainTaskList)
    // console.log('appStore title = ',title)
    return title[0]
  }
  
  getTaskTitleAndComment = (mainTaskId, taskIndex) => {


    const title = this.subTasks[mainTaskId][taskIndex].title
    const comment = this.subTasks[mainTaskId][taskIndex].comment
    // const title = this.subTasks[mainTaskId][index].title
    // const comment = this.subTasks[mainTaskId][index].comment


    console.log('appStore title = ', title)
    console.log('appStore comment = ',comment)
    console.log('appStore index = ',taskIndex)
    return {title, comment}
  }



  fetchTasks = (userId) => {
    const unsubscribeVoid = fb.taskSnapshot({
      setMainTaskList: this.setMainTaskList,
      userId
    })
    
    this.setUnsubscribeVoid(unsubscribeVoid)
  }


  setSubTasks = (data) => {
    this.subTasks = data
  }



  addMainTaskList = (payload) => {
    const {userId, title} = payload
    fb.addTaskList({ userId, title })
  }

  updateMainTaskList = (payload) => {
    fb.updateTaskList(payload)
  }

  addSubTask = (payload) => {
    fb.addSubTask(payload)
  }


  updateSubTask = (payload) => {
    fb.updateSubTask(payload)
  }


  removeSubTask = (payload) => {
    fb.removeSubTask(payload)
  }




  setUnsubscribeVoid = (unsubscribe) => {
    this.unsubscribeVoid = unsubscribe
  }

  removeAllTaskList = () => {
    fb.deleteAllTaskList()

  }


 removeMainTask = (mainTaskId) => {
  fb.removeMainTask(mainTaskId)
 }



  // getTaskByIndex = (index) => {
  //   return this.mainTaskList[index]
  // }

}

export default new appStore();

