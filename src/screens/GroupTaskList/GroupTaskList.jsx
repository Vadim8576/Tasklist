import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import { useListFilter } from '../../hooks/useListFilter';
import ListItem from './listItem';
import { useInputDialog } from '../../hooks/useInputDialog';
import InputDialog from './InputDialog';
import AddButton from '../../components/AddButton';
import { dialogActions } from '../../const/constants'



export default GroupTaskList = observer(({ navigation, route, setNumberOfGroupTasks }) => {

  const [visible, setVisible] = useState(false)
  const { user } = useAuth()
  const userId = user.uid

  const list = useListFilter(appStore.taskList, 'GROUP')

  



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

  },
  footer: {
    height: 90
  }
});