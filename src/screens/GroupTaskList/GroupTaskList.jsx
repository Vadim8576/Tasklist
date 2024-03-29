import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import { dialogActions } from '../../const/constants'
import AddButton from '../../components/AddButton';
import { useListFilter } from '../../hooks/useListFilter';
import ListItem from '../../components/ListItem';



export default GroupTaskList = observer(({
  navigation,
  route,
  setNumberOfGroupTasks,
  currentListType
}) => {



  const list = useListFilter(appStore.taskList, currentListType)

  // console.log('GroupTaskList = ', list)

  console.log('currentListType = ', currentListType)

  useEffect(() => {
    setNumberOfGroupTasks(list?.length)
  }, [list?.length])


  console.log('GroupTaskList render')

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

  },
  footer: {
    height: 90
  }
});