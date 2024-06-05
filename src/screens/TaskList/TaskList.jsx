
import { FlatList, View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { dialogActions } from '../../const/constants';
import GroupButton from '../../components/UI/GroupButton';
import ListItem from './ListItem';
import { useGetListByScreenName } from '../../hooks/useGetListByScreenName';
import appStore from '../../store/appStore';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { useGroupButton } from '../../hooks/useGroupButton';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';



export default TaskList = observer(({ navigation, route }) => {



  const theme = useTheme()

  const screenName = route.name

  const { buttonGroup } = useGroupButton({
    navigation,
    actionType: screenName === 'TaskList' ? dialogActions.addTaskList : dialogActions.addGroupList
  })

 
  console.log('mAINtASKlIST render')
  console.log('screenName = ', screenName)



  return (
    <>
      <View style={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
      >
        <FlatList
          data={screenName === 'TaskList' ? appStore.taskList: appStore.groupTaskList}
          renderItem={({ item }) => (
            <TouchableRipple
              key={item.taskListId}
              background={theme.colors.surfaceVariant}
              onPress={() => buttonGroup.onPressItem(item)}
              onLongPress={() => {
                buttonGroup.onLongPressItem(item.taskListId)
              }}
            >
              <ListItem     
                navigation={navigation}
                isSelected={buttonGroup.getSelected(item.taskListId)}
                item={item}
              />
            </TouchableRipple>

          )}
          ListFooterComponent={<View style={[
            styles.footer,
          ]} />}
        // ListEmptyComponent={}
        />
      </View>

      <GroupButton
        buttonGroup={buttonGroup}
      />
    </>

  );
})





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
    // paddingTop: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  footer: {
    height: 85,
  }
});