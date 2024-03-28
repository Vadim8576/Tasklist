import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import { useListFilter } from '../../hooks/useListFilter';
import AddButton from '../../components/AddButton';
import { dialogActions } from '../../const/constants'
import ListItem from '../../components/ListItem';



export default GroupTaskList = observer(({ navigation, route, setNumberOfGroupTasks }) => {

  const { user } = useAuth()

  const list = useListFilter(appStore.taskList, 'GROUP')

  // console.log('GroupTaskList = ', list)

  useEffect(() => {
    setNumberOfGroupTasks(list.length)
  }, [list.length])


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