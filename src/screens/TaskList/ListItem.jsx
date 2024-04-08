import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, TouchableRipple, Icon, Avatar } from 'react-native-paper';
import { dateConversion } from '../../helpers/dateСonversion';
import ContextMenu from '../../components/ContextMenu/ContextMenuContainer';
import UsersList from '../../components/UsersList';




//TaskList
export default ListItem = observer(({ taskList, navigation }) => {

  const theme = useTheme();

  return (
    <View style={styles.listItemWrapper}>
      <TouchableRipple
        // borderless={false}
        background={theme.colors.surfaceVariant}
        onPress={() => navigation.navigate(
          'SubTaskList', {
          taskList
        })
        }
      >
        <List.Item
          title={taskList.title}
          style={[
            styles.listItem,
            { backgroundColor: theme.colors.background }
          ]}
          titleStyle={styles.title}
          description={
            taskList.groupUsersIds.length === 0
              ? dateConversion(taskList.createdAt)
              : () => <UsersList users={taskList.groupUsersIds} />
          }
          descriptionStyle={styles.description}
          left={() =>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
             
              <Avatar.Text size={20} label={taskList?.title?.substring(0, 1)} />
            </View>

          }
          right={() =>
            <ContextMenu
              navigation={navigation}
              taskListId={taskList.taskListId}
            />
          }
        />
      </TouchableRipple>
    </View>
  )
})



const styles = StyleSheet.create({
  listItemWrapper: {
    marginBottom: 5,
  },
  listItem: {
    paddingLeft: 15,
    paddingRight: 5,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 2
  },
  title: {
    color: '#000',
    fontSize: 14
  },
  description: {
    fontSize: 9
  }
})