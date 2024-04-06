
import { FlatList, View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { dialogActions } from '../../const/constants';
import AddButton from '../../components/AddButton';
import ListItem from '../../components/ListItem';
import { useListFilter } from '../../hooks/useListFilter';
import appStore from '../../store/appStore';


export default TaskList = observer((props) => {

  // console.log('props = ', props)
  const {navigation, route} = props

  const taskList = appStore.taskList

  const screenName = route.name
  const filteredList = useListFilter(taskList, screenName)

  console.log('mAINtASKlIST render')
  // console.log('mAINtASKlIST navigation = ', navigation)
  console.log('mAINtASKlIST screen name = ', route.name)
  // console.log('mAINtASKlIST screen name = ', route)


  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <ListItem
              key={item.taskListId}
              taskList={item}
              navigation={navigation}
              screenName={screenName}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
      <AddButton
        navigation={navigation}
        type={dialogActions.addTaskList}
        screenName={screenName}
      />
    </>

  );
})





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // paddingTop: 10,
    // paddingBottom: 50,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  footer: {
    height: 90
  }
});