import { dialogActions } from "../const/constants"

export const getFBCollectionId = (actionType) => {
  if(actionType === dialogActions.addTaskList) return 'list'
  if(actionType === dialogActions.addGroupList) return 'grouplist'
  if(actionType === dialogActions.editTaskListTitle) return 'list'
  if(actionType === dialogActions.editGroupTaskListTitle) return 'grouplist'

}