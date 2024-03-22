import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { FAB } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import ListItem from './listItem';
import InputDialog from './InputDialog';
import { useInputDialog } from '../../hooks/useInputDialog';
import { dialogActions } from '../../const/constants';

export default MainTaskList = observer(({ navigation, route }) => {

  const { user } = useAuth()
  const userId = user.uid

  const {
    showDialog, 
    hideDialog, 
    onSubmit, 
    visible, 
    title, 
    setTitle
  } = useInputDialog({type: dialogActions.addTaskList})
  
  
 
  useEffect(() => {
    if (!userId) return
    appStore.fetchTasks(userId)

    // console.log('mainTaskList user = ', user.uid)
    // console.log('mainTaskList tasks = ', appStore.mainTaskList)
    // console.log('mainTaskList ID = ', appStore.mainTaskList.mainTaskId)

  }, [userId])


  console.log('mAINtASKlIST render')

  return (
    <>
      <View style={styles.container}>
      <FlatList
        data={appStore.mainTaskList}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            navigation={navigation}
            route={route}
          />
        )}
      /> 
    </View>
    <FAB
        icon="plus"
        style={styles.fab}
        onPress={showDialog}
      />
    <InputDialog
        visible={visible}
        hideDialog={hideDialog}
        onSubmit={onSubmit}
        title={title}
        setTitle={setTitle}
      />
    </>
    
  );
})





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});