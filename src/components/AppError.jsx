import { observer } from "mobx-react-lite";
import errorStore from '../store/errorStore';
import MessageSnackBar from './MessageSnackBar';


export default AppError = observer(() => {

  const onDismissSnackBar = () => {
    errorStore.resetMessage() 
  }

  if(!errorStore.message.isError && !errorStore.message.isSuccess) return null

  return (
    <MessageSnackBar   
      message={errorStore.message}
      onDismissSnackBar={onDismissSnackBar}
    />
  )
})


