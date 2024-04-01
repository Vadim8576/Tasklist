
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { dialogActions } from '../../const/constants';
import AddButton from '../../components/AddButton';
import ListItem from '../../components/ListItem';
import { useEffect } from 'react';
import authStore from '../../store/authStore';

export default FavoriteUsers = observer((props) => {


  console.log('Favorite Users render')



  useEffect(() => {
    // authStore.createUser()

  }, [])



  return (
    <>

      <View style={styles.container}>
        <Text>Мои друзья</Text>
        {/* <FlatList
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
        /> */}
      </View>
      {/* <AddButton
        navigation={navigation}
        type={dialogActions.addTaskList}
        screenName={screenName}
      /> */}
    </>

  );
})





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    height: 90
  }
});