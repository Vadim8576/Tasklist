import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, Icon, Avatar } from 'react-native-paper';
import { dateConversion } from '../../helpers/dateСonversion';
import MembersHorizontalList from '../../components/MembersHorizontalList';
import useGetMembersByIds from '../../hooks/useGetMembersByIds';
import { useEffect, useState } from 'react';
import MembersListDialog from '../../components/MembersListDialog';
import usersStore from '../../store/usersStore';



//TaskList
export default ListItem = observer(({ item, isSelected }) => {

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const theme = useTheme();

  // console.log('ListItem item.taskListId = ', item.taskListId)
  console.log('ListItem item.membersIds = ', item.membersIds)

  const members = useGetMembersByIds(item.membersIds)


  return (
    <View style={styles.listItemWrapper}>
      <List.Item
        title={item.title}
        style={[
          styles.item,
          {
            backgroundColor:
              isSelected
                ? theme.colors.tertiaryContainer
                : theme.colors.background
          }
        ]}
        titleStyle={styles.title}
        description={
          item.membersIds === null
            ? dateConversion(item.createdAt)
            : () => members && <MembersHorizontalList members={members} showModal={showModal} />
        }
        descriptionStyle={styles.description}
        left={() =>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Avatar.Text
              style={{ backgroundColor: theme.colors.tertiary }}
              color={theme.colors.onTertiary}
              size={30}
              label={item?.title?.substring(0, 1)}
            />
          </View>
        }

        right={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              source="chevron-right"
              size={22}
              color={theme.colors.outline}
            />
          </View>

        )}

      // right={() =>
      //   <ContextMenu
      //     navigation={navigation}
      //     listId={taskList.taskListId}
      //     currentList='TASK_LIST'
      //   />
      // }
      />
      <MembersListDialog
        visible={visible}
        hideModal={hideModal}
        taskListId={item.taskListId}
      />
    </View>


  )
})



const styles = StyleSheet.create({
  listItemWrapper: {
    // marginBottom: 5,
  },
  item: {
    paddingLeft: 20,
    paddingRight: 15,
    // borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    color: '#000',
    fontSize: 14
  },
  description: {
    fontSize: 9
  }
})