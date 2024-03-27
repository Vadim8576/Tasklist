import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import { useListFilter } from '../../hooks/useListFilter';
import ListItem from './listItem';
import { useInputDialog } from '../../hooks/useInputDialog';
import { dialogActions } from '../../const/constants';
import InputDialog from '../TaskList/InputDialog';
import AddButton from '../../components/AddButton';

// import { useInputDialog } from '../../hooks/useInputDialog';
// import { dialogActions } from '../../const/constants';



export default GroupTaskList = observer(({ navigation, route, setNumberOfGroupTasks }) => {

  
  const { user } = useAuth()
  const userId = user.uid

  const list = useListFilter(appStore.taskList, 'GROUP')

  const {
    showDialog,
    hideDialog,
    onSubmit,
    visible,
    title,
    setTitle
  } = useInputDialog({ type: dialogActions.addTaskList })



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
              item={item}
              navigation={navigation}
              route={route}
            />

          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
      <AddButton
        showDialog={showDialog}
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

  },
  footer: {
    height: 90
  }
});