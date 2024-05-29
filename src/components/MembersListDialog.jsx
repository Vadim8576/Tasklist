import { observer } from "mobx-react-lite";
import { Dialog, IconButton, Portal, useTheme } from "react-native-paper";
import MembersVerticalList from "./MembersVerticalList";
import useGetMembersByIds from "../hooks/useGetMembersByIds";
import appStore from "../store/appStore";


export default MembersListDialog = observer(({ visible, hideModal, taskListId }) => {


  const theme = useTheme();

  const members = useGetMembersByIds(appStore.members[taskListId])



  const removeMember = (memberId) => {
    appStore.removeMember({ memberId, taskListId })
  }


  if(members?.length === 0) return null



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
          <MembersVerticalList
            removeMember={removeMember}
            members={members} />
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

