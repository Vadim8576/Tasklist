import { observer } from "mobx-react-lite";
import errorStore from '../store/errorStore';
import MessageSnackBar from './MessageSnackBar';


export default AppError = observer(() => {

  if(!errorStore.message.isError && !errorStore.message.isSuccess) return null

  
  const onDismissSnackBar = () => {
    errorStore.resetMessage() 
  }


  return (
    <MessageSnackBar   
      message={errorStore.message}
      onDismissSnackBar={onDismissSnackBar}
    />
  )
})


