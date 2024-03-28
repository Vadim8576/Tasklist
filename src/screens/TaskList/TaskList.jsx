import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import { dialogActions } from '../../const/constants';
import AddButton from '../../components/AddButton';
import { useListFilter } from '../../hooks/useListFilter';
import { setUserId } from 'firebase/analytics';
import authStore from '../../store/authStore';
import ListItem from '../../components/ListItem';


export default TaskList = observer(({ navigation, route, setNumberOfTasks }) => {

  const { user } = useAuth()
  const userId = user.uid


  const list = useListFilter(appStore.taskList, 'NOT_GROUP')


  useEffect(() => {
    if (!userId) return
    const unsubscribe = appStore.subscribeToTasks(userId)

    return unsubscribe
  }, [userId])


  useEffect(() => {
    if(!userId) return
    authStore.setUser(user)
  }, [userId])


  useEffect(() => {
    setNumberOfTasks(list.length)
  }, [list.length])



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