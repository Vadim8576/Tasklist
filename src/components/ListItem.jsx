import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, TouchableRipple } from 'react-native-paper';
import { useState } from 'react';
import { dateConversion } from '../helpers/dateСonversion';
import TaskListContextMenu from './ContextMenu';
import UsersList from './UsersList';




//TaskList
export default ListItem = observer(({ taskList, navigation }) => {

  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false)


  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


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
          titleStyle={styles.title}
          title={taskList.title}
          description={
            taskList.groupUsersIds.length === 0
            ? dateConversion(taskList.createdAt)
            : (_) => <UsersList  users={taskList.groupUsersIds} />
          }
          descriptionStyle={styles.description}
          right={props =>
            <TaskListContextMenu
              menuVisible={menuVisible}
              closeMenu={closeMenu}
              openMenu={openMenu}
              taskListId={taskList.taskListId}
              navigation={navigation}
            />
          }
        />
      </TouchableRipple>
    </View>
  )
})



const styles = StyleSheet.create({
  listItemWrapper: {
    borderBottomWidth:1,
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