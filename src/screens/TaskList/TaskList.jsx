
import { FlatList, View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { dialogActions } from '../../const/constants';
import AddButton from '../../components/AddButton';
import ListItem from '../../components/ListItem';


export default TaskList = observer(({
  navigation,
  route,
  currentListType,
  list
}) => {



  console.log('mAINtASKlIST render')

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <ListItem
              taskList={item}
              route={route}
              navigation={navigation}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
      <AddButton
        navigation={navigation}
        route={route}
        type={dialogActions.addTaskList}
        currentListType={currentListType}
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