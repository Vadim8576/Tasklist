
import { FlatList, View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { dialogActions } from '../../const/constants';
import AddButton from '../../components/AddButton';
import ListItem from './ListItem';
import { useListFilter } from '../../hooks/useListFilter';
import appStore from '../../store/appStore';
import { useTheme } from 'react-native-paper';


export default TaskList = observer(({navigation, route}) => {

  const theme = useTheme()
  const taskList = appStore.taskList
  const screenName = route.name
  const filteredList = useListFilter(taskList, screenName)

  console.log('mAINtASKlIST render')


  return (
    <>
      <View style={[
        styles.container,
        {backgroundColor: theme.colors.surfaceVariant}
      ]}
      >
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <ListItem
              key={item.taskListId}
              taskList={item}
              navigation={navigation}
            />
          )}
          ListFooterComponent={<View style={[
            styles.footer,
          ]} />}
          // ListEmptyComponent={}
        />
      </View>
      <AddButton
        navigation={navigation}
        type={dialogActions.addTaskList}
      />
    </>

  );
})





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  footer: {
    height: 85,
  }
});