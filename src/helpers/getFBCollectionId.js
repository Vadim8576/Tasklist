import { dialogActions } from "../const/constants"

export const getFBCollectionId = (type) => {
  if(type === dialogActions.addTaskList) return 'list'
  if(type === dialogActions.addGroupList) return 'grouplist'
  if(type === dialogActions.editTaskListTitle) return 'list'
  if(type === dialogActions.editGroupTaskListTitle) return 'grouplist'

}