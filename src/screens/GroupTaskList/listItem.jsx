import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, TouchableRipple } from 'react-native-paper';
import { useState } from 'react';

import { dateConversion } from '../../helpers/dateСonversion';
import { useAuth } from '../../hooks/useAuth';
import UsersList from './UsersList';
import TaskListContextMenu from '../TaskList/TaskListContextMenu';



//TaskList
export default ListItem = observer(({ item, navigation }) => {


  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false)

  const taskList = item

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // return

  return (
    <View style={styles.listItemWrapper}>
      <TouchableRipple
        onPress={() => navigation.navigate(
          'SubTaskList', {
          taskList,
          name: 'SubTaskList'
        })
        }
      >
        <List.Item
          titleStyle={styles.title}
          title={item.title}
          description={(props) => <UsersList users={item.groupUsersIds} />
          }
          descriptionStyle={styles.description}
          right={props =>
            <TaskListContextMenu
              menuVisible={menuVisible}
              closeMenu={closeMenu}
              openMenu={openMenu}
              item={item}
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