import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, TouchableRipple } from 'react-native-paper';
import { useState } from 'react';
import MainContextMenu from './TaskListContextMenu';
import { dateConversion } from '../../helpers/dateСonversion';



//TaskList
export default ListItem = observer(({ item, navigation }) => {

  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false)

  const taskList = item

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


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
          description={dateConversion(item.createdAt)}
          descriptionStyle={styles.description}
          right={props =>
            <MainContextMenu
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