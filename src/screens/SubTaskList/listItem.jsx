import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List, Checkbox, TouchableRipple } from 'react-native-paper';
import appStore from '../../store/appStore';
import ContextMenu from '../../components/ContextMenu/ContextMenuContainer';


//SubTaskList
export default ListItem = observer(({ item, taskIndex, taskListId, navigation }) => {

  const theme = useTheme();

  const titleStyle = {
    textDecorationLine: item.complited ? 'line-through' : 'none',
    textDecorationColor: theme.colors.primary,
    color: item.complited ? theme.colors.primary : '#000',
  }

  const descriptionStyle = {
    ...titleStyle,
    fontSize: 12,
    color: theme.colors.secondary
  }

  const onChange = () => {
    appStore.updateTask({
      taskIndex,
      title: item.title,
      comment: item.comment,
      complited: !item.complited,
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
          titleStyle={[
            titleStyle,
            styles.title
          ]}
          left={_ =>
            <Checkbox
              status={item.complited ? 'checked' : 'unchecked'}
              onPress={onChange}
            />}
          right={_ =>
            <ContextMenu
              navigation={navigation}
              taskListId={taskListId}
              taskIndex={taskIndex}
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
    paddingLeft: 20
  },
  title: {
    fontSize: 14
  },
})