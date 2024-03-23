import { makeAutoObservable } from "mobx";
import { setMessage } from "../api/firebase";


class errorStore {

  message = {}

  constructor() {
    makeAutoObservable(this);
    setMessage({
      setErrorMessage: this.setErrorMessage,
      setSuccessMessage: this.setSuccessMessage
    })
  }

  setErrorMessage = () => {

    console.log('setErrorMessage!!!!')
    this.message = {
      isError: true,
      isSuccess: false,
      text: 'Что-то пошло не так!'
    }
  }

  setSuccessMessage = () => {
    this.message = {
      isError: false,
      isSuccess: true,
      text: 'Сделано!'
    }
  }

  resetMessage = () => {
    this.message = {
      isError: false,
      isSuccess: false,
      text: ''
    }
  }
}

export default new errorStore();

