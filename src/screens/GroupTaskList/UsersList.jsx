import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import { useListFilter } from '../../hooks/useListFilter';
import ListItem from './listItem';

// import { useInputDialog } from '../../hooks/useInputDialog';
// import { dialogActions } from '../../const/constants';



export default GroupUserList = observer((users) => {

  const theme = useTheme()

console.log('GroupUserList users = ', users)
  return (
    <>
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={users.users}
          renderItem={(user) => (
            <View style={styles.avatar}>
              <Avatar.Text size={22} label="XD" />
            </View>    
          )}
          ListFooterComponent={
          <Avatar.Icon
            size={22}
            icon="plus"
            style={{backgroundColor: theme.colors.primaryContainer}}
          />
          }
        />
      </View>
    </>

  );
})





const styles = StyleSheet.create({
  container: {
   marginTop: 10,
  },
  avatar: {
   marginRight: 10,
  },

});