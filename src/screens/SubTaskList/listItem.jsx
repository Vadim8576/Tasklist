import { Text, View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, Checkbox, TouchableRipple } from 'react-native-paper';
import { useState } from 'react';
import appStore from '../../store/appStore';
import TaskContextMenu from './SubTaskContextMenu';


//SubTaskList
export default ListItem = observer(({ item, taskIndex, taskListId }) => {

  const theme = useTheme();
  const [checked, setChecked] = useState(item.complited)
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


  console.log('List item taskListId!!!!!!!!!! = ', taskListId)
  console.log('List item taskIndex!!!!!!!!!! = ', taskIndex)

  const titleStyle = {
    textDecorationLine: checked ? 'line-through' : 'none',
    textDecorationColor: theme.colors.primary,
    color: checked ? theme.colors.primary : '#000',
    fontSize: 14
  }

  const descriptionStyle = {
    ...titleStyle,
    fontSize: 12,
    color: theme.colors.secondary
  }

  const onChange = () => {
    const complited = !checked
    setChecked(complited)
    appStore.updateTask({
      taskIndex,
      title: item.title,
      comment: item.comment,
      complited: complited,
      taskListId
    })

  }

  return (
    <View style={styles.listItemWrapper}>
      <TouchableRipple
        onPress={() => console.log(item.title)}
      >
        <List.Item
          title={item.title}
          description={item.comment}
          descriptionStyle={descriptionStyle}
          titleStyle={styles.title}
          left={props =>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={onChange}
            />}
          right={props =>
            <TaskContextMenu
              menuVisible={menuVisible}
              closeMenu={closeMenu}
              openMenu={openMenu}
              item={item}
              taskIndex={taskIndex}
              taskListId={taskListId}
            />}
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
    paddingLeft: 20
  },
  title: {
    fontSize: 14
  },
})