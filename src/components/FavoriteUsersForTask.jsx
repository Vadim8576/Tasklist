
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { List, Avatar, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import commonStyles from '../screens/FavoriteUsers/commonStyles';
import { useAuth } from '../hooks/useAuth';
import friendsStore from '../store/friendsStore';
import { useEffect, useState } from 'react';
import useGetFriendById from '../hooks/useGetFriendById';




export default FavoriteUsersForTask = observer(({ groupUsersIds }) => {
  const theme = useTheme()


  console.log('FavoriteUsersForTask render')
  console.log('FavoriteUsersForTask friendsIds = ', groupUsersIds)


  const { friends } = useGetFriendById(groupUsersIds)

  console.log('FavoriteUsersForTask friends = ', friends)


  const removeFriend = (friendId) => {

    // friendsStore.removeFriend({ friendId, userId: user.uid })
  }





  return (
    <View style={[
      // { backgroundColor: theme.colors.primaryContainer },
      styles.wrapper
    ]}>
      {/* <Text>Избранные пользователи:</Text> */}
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <List.Item
            style={{
              paddingRight: 10,
            }}
            key={item.id}
            title={item.nickName}
            description={`ID: ${item.id}`}
            descriptionStyle={styles.description}
            left={() => (
              <View style={{ justifyContent: 'center' }}>
                <Avatar.Text
                  color="white"
                  style={{ backgroundColor: theme.colors.tertiary }}
                  size={28}
                  label={item.nickName.substring(0, 1)}
                />
              </View>
            )}
            right={() => (
              <Pressable
                onPress={() => removeFriend(item.id)}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? theme.colors.primaryContainer : theme.colors.background },

                  styles.pressable
                ]}
              >
                <List.Icon
                  color={theme.colors.secondary}
                  style={styles.rightIcon}
                  icon="close"
                />
              </Pressable>
            )}
          />
        )}
      />
    </View>
  );
})


const styles = StyleSheet.create({
  ...commonStyles,
  description: {
    fontSize: 10,
  },
  // submit: {
  //   flexGrow: 0,
  //   flexBasis: RIGHT_BUTTON_SIZE,
  //   flexShrink: 0,
  // },
});