
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { List, Avatar, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { RIGHT_BUTTON_SIZE } from '../../const/constants';
import commonStyles from './commonStyles';
import { useAuth } from '../../hooks/useAuth';
import usersStore from '../../store/usersStore';




export default FavoriteUserList = observer(({favoriteUsers}) => {
  const theme = useTheme()

  const { user } = useAuth()
  console.log('FriensLisrt render')
  // console.log('FriensLisrt favoriteUsers = ', favoriteUsers)



  const removeFriend = (friendId) => {

    usersStore.removeFriend({ friendId, userId: user.uid })
  }


  return (
    <View style={[
      // { backgroundColor: theme.colors.primaryContainer },
      styles.wrapper
    ]}>
      {/* <Text>Избранные пользователи:</Text> */}
      <FlatList
        data={favoriteUsers}
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
    fontSize: 12,
  },
  // submit: {
  //   flexGrow: 0,
  //   flexBasis: RIGHT_BUTTON_SIZE,
  //   flexShrink: 0,
  // },
});