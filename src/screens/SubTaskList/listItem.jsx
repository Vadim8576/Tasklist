import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme, List, Checkbox, TouchableRipple } from 'react-native-paper';
import appStore from '../../store/appStore';
import ContextMenu from '../../components/ContextMenu/ContextMenuContainer';


//SubTaskList
export default ListItem = observer(({ item, taskListId, subTaskListId, isSelected }) => {


  // console.log('List Item taskListId = ', taskListId)
  // console.log('List Item subTaskListId = ', subTaskListId)
  const theme = useTheme();

  const titleStyle = {
    textDecorationLine: item.complited ? 'line-through' : 'none',
    textDecorationColor: theme.colors.primary,
    color: item.complited ? theme.colors.primary : '#000',
  }

  const descriptionStyle = {
    ...titleStyle,
    fontSize: 12,
    color: item.complited ? theme.colors.primaryContainer : theme.colors.secondary,
  }

  const onChange = () => {
    appStore.updateTask({
      listId: subTaskListId,
      taskListId,
      title: item.title,
      comment: item.comment,
      complited: !item.complited,
    })

    
  }

  return (
    <View style={styles.listItemWrapper}>
      <List.Item
        title={item.title}
        style={[
          styles.listItem,
          {
            backgroundColor:
              isSelected
                ? theme.colors.tertiaryContainer
                : theme.colors.background
          }
        ]}
        description={item.comment}
        descriptionStyle={descriptionStyle}
        titleStyle={[
          titleStyle,
          styles.title
        ]}
       
        left={() =>
          <BouncyCheckbox
            size={24}
            fillColor={theme.colors.primary}
            unFillColor={theme.colors.background}
            // iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={onChange}
            isChecked={item.complited}
          />
        }
      />
    </View>
  )
})





const styles = StyleSheet.create({
  listItemWrapper: {
    // marginBottom: 5,
  },
  listItem: {
    // paddingLeft: 10,
    // paddingRight: 5,
    // borderRadius: 10,

    paddingLeft: 20,
    paddingRight: 15,
    // borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    // color: '#000',
    fontSize: 14
  },
  description: {
    fontSize: 9
  }
})