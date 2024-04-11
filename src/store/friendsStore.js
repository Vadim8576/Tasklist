import { makeAutoObservable } from "mobx";
import { fb } from "../api/firebase";



class FriendsStore {

  friends = []
  foundFriend = null

  constructor() {
    makeAutoObservable(this)
  }


  resetFriends = () => {
    this.friends= []
  }

  getFriends = async (userId) => {
    // this.resetFriends()
    this.setFriends(await fb.getFriends(userId))
  }

  setFriends = (friend) => {
    console.log('authStore friend = ', friend)
    this.friends = friend
    // this.friends = [...this.friends, friend]
  }

  getFriendById = async  (friendId) => {
    // this.setFoundFriend({})
    this.setFoundFriend(await fb.getFriendById(friendId))
    
    return this.foundFriend
  }

  setFoundFriend = (foundFriend) => {
    this.foundFriend = foundFriend
  }

  addFriend = async (ids) => {
    await fb.addFriend(ids)
    console.log('после firebase addFriend')
    this.getFriends(ids.userId)
    this.setFoundFriend(null)
  }

  removeFriend = async (ids) => {
    await fb.removeFriend(ids)
    this.getFriends(ids.userId)
  }

}

export default new FriendsStore();

