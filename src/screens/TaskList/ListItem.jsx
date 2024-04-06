import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, TouchableRipple } from 'react-native-paper';
import { dateConversion } from '../../helpers/dateСonversion';
import ContextMenu from '../../components/ContextMenu/ContextMenuContainer';
import UsersList from '../../components/UsersList';




//TaskList
export default ListItem = observer(({ taskList, navigation }) => {

  const theme = useTheme();

  return (
    <View style={styles.listItemWrapper}>
      <TouchableRipple
        onPress={() => navigation.navigate(
          'SubTaskList', {
          taskList
        })
        }
      >
        <List.Item
            title={taskList.title}
          style={{
            paddingRight: 0,
          }}
          titleStyle={styles.title}
          description={
            taskList.groupUsersIds.length === 0
              ? dateConversion(taskList.createdAt)
              : () => <UsersList users={taskList.groupUsersIds} />
          }
          descriptionStyle={styles.description}
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
    borderBottomWidth: 1,
    borderColor: '#999',
    borderStyle: 'solid',
  },
  title: {
    color: '#000',
    fontSize: 14
  },
  description: {
    fontSize: 9
  }
})