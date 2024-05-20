import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";


class appStore {

  isLoggedIn = false
  // isLoading = false
  taskList = []
  groupTaskList = []
  subTaskList = []
  unsubscribeVoid = null

  members = {}

  message = {}


  constructor() {
    makeAutoObservable(this);
    // makeAutoObservable(this, {}, { autoBind: true });
  }

  // setIsLoading = (isLoading) => {
  //   this.isLoggedIn = isLoading
  // }


  setMembers = (members) => {
    this.members = members
  }


  removeMember = async (ids) => {
    await fb.removeMember(ids)
    // this.getFavoriteUsers(ids.userId)
  }


  setTaskList = (data) => {

    // console.log('setTaskList data = ', data)
    if (!data) return

    let membersObj = {}

    this.taskList = data.map(d => {
      const list = {
        createdAt: d.createdAt,
        creatorId: d.creatorId,
        taskListId: d.taskListId,
        title: d.title,
        groupUsersIds: d.groupUsersIds
      }

      membersObj = { ...membersObj, [d.taskListId]: d.groupUsersIds }

      return list
    })

    this.setMembers(membersObj)
  }


  setGroupTaskList = (data) => {


    console.log('setGroupTaskList data = ', data) 


    if (!data) return

    let membersObj = {}

    this.groupTaskList = data.map(d => {
      const list = {
        createdAt: d.createdAt,
        creatorId: d.creatorId,
        taskListId: d.taskListId,
        title: d.title,
        groupUsersIds: d.groupUsersIds
      }

      membersObj = { ...membersObj, [d.taskListId]: d.groupUsersIds }

      return list
    })

    this.setMembers(membersObj)
  }



  get getTaskList() {
    return this.taskList
  }


  get getGroupTaskList() {
    return this.groupTaskList
  }



  getTaskListTitle = (id) => {
    const task = this.taskList.filter((item) => item.taskListId === id)
    return task[0]?.title
  }

  getGroupTaskListTitle = (id) => {
    const task = this.groupTaskList.filter((item) => item.taskListId === id)
    return task[0]?.title
  }

  getTaskTitleAndComment = (id) => {

    console.log('getTaskTitleAndComment id = ', id)

    const subTasks = this.subTaskList.filter(task => task.subTaskListId === id)
    const title = subTasks[0]?.title
    const comment = subTasks[0]?.comment

    return { title, comment }
  }


  subscribeToTaskList = (payload) => {
    const { userId, collectionId } = payload


    console.log('subscribeToTaskList collectionId = ', collectionId)

    const payloadObj = {
      setTaskList: collectionId === 'list' ? this.setTaskList : this.setGroupTaskList,
      userId,
      collectionId
    }


    const unsubscribe = fb.taskListSnapshot(payloadObj)

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

    // console.log('subTaskList.subTaskListId = ', this.subTaskList.subTaskListId)
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


  removeSelectedTask = async (ids) => {
    await fb.removeSelectedTask(ids)
  }

}

export default new appStore();

