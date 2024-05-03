
import { FlatList, View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { dialogActions } from '../../const/constants';
import GroupButton from '../../components/UI/GroupButton';
import ListItem from './ListItem';
import { useListFilter } from '../../hooks/useListFilter';
import appStore from '../../store/appStore';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { useGroupButton } from '../../hooks/useGroupButton';



export default TaskList = observer(({ navigation, route }) => {

  const theme = useTheme()

  const taskList = appStore.taskList
  const screenName = route.name
  const filteredList = useListFilter(taskList, screenName)

  

  const {
    buttonGroup
  } = useGroupButton({
    navigation,
    type: dialogActions.addTaskList
  })

 
  console.log('mAINtASKlIST render')



  return (
    <>
      <View style={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
      >
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <TouchableRipple
              key={item.taskListId}
              background={theme.colors.surfaceVariant}
              onPress={() => buttonGroup.onPressItem(item)}
              onLongPress={() => {
                buttonGroup.onLongPressItem(item.taskListId)
              }}
            >
              <ListItem     
                isSelected={buttonGroup.getSelected(item.taskListId)}
                item={item}
              />
            </TouchableRipple>

          )}
          ListFooterComponent={<View style={[
            styles.footer,
          ]} />}
        // ListEmptyComponent={}
        />
      </View>

      <GroupButton
        buttonGroup={buttonGroup}
      />
    </>

  );
})





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
    // paddingTop: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  footer: {
    height: 85,
  }
});