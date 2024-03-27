import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import ListItem from './listItem';
import InputDialog from './InputDialog';
import { useInputDialog } from '../../hooks/useInputDialog';
import { dialogActions } from '../../const/constants';
import AddButton from '../../components/AddButton';
import { useListFilter } from '../../hooks/useListFilter';


export default TaskList = observer(({ navigation, route, setNumberOfTasks }) => {

  const [visible, setVisible] = useState(false)
  const { user } = useAuth()
  const userId = user.uid



  const list = useListFilter(appStore.taskList, 'NOT_GROUP')


  useEffect(() => {
    if (!userId) return
    const unsubscribe = appStore.subscribeToTasks(userId)

    return unsubscribe
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
              item={item}
              navigation={navigation}
              route={route}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
      <AddButton
        showDialog={() => setVisible(true)}
      />
      <InputDialog
        visible={visible}
        setVisible={setVisible}
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