import { observer } from "mobx-react-lite";
import { Dialog, IconButton, Portal, useTheme } from "react-native-paper";
import FavoriteUserList from "../screens/FavoriteUsers/FavoriteUserList";
import MembersList from "./MembersList";
import useGetMembersByIds from "../hooks/useGetMembersByIds";
import appStore from "../store/appStore";


export default MembersListDialog = observer(({ visible, hideModal, taskList }) => {


  const theme = useTheme();

  const {members} = useGetMembersByIds(appStore.members[taskList.taskListId])



  const removeMember = (memberId) => {
    appStore.removeMember({ memberId, taskListId: taskList.taskListId })
  }


  if(members.length === 0) return null



  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideModal}
        style={{
          padding: 0,
          backgroundColor: 'white',
          maxHeight: '60%'
        }}
      >
        <Dialog.Title>Участники</Dialog.Title>

        <Dialog.ScrollArea>
          <MembersList
            removeMember={removeMember}
            members={
              members
              // [
              //   { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs1", "nickName": "Александр" },
              //   { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz2", "nickName": "Люся" },
              //   { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs3", "nickName": "Александр" },
              //   { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz4", "nickName": "Люся" },
              //   { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs5", "nickName": "Александр" },
              //   { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz6", "nickName": "Люся" },
              //   { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs7", "nickName": "Александр" },
              //   { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz8", "nickName": "Люся" },
              //   { "id": "17dNpCh4kDX5dhQBPyiOaVEBBxs9", "nickName": "Александр" },
              //   { "id": "y4Q2IaI2TSSAhPEmJGC1SvhnCnz0", "nickName": "Люся" },
              // ]
            } />
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <IconButton
            icon="plus"
            size={26}
            containerColor={theme.colors.tertiary}
            iconColor={theme.colors.onTertiary}
            onPress={() => console.log('Pressed')}
          />
        </Dialog.Actions>
      </Dialog>

    </Portal>
  )
})

