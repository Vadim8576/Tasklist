
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { List, Avatar, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { RIGHT_BUTTON_SIZE } from '../../const/constants';
import commonStyles from './commonStyles';
import { useAuth } from '../../hooks/useAuth';
import usersStore from '../../store/usersStore';
import appStore from '../../store/appStore';
import FavoriteUsersRightButton from '../../components/UI/FavoriteUsersRightButton';




export default FavoriteUserList = observer(({type, favoriteUsers, userId}) => {


  // const type = 'INVITE' // 'DELETE'

  const theme = useTheme()

  console.log('FriensLisrt render')
  // console.log('FriensLisrt favoriteUsers = ', favoriteUsers)



  const pressHandler = (friendId) => {
    if(type === 'INVITE') {
      console.log('Пригласили участника')
    }
    if(type === 'DELETE') {
      if(friendId === null) return
      usersStore.removeFavoriteUser({ friendId, userId })
    }
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
            right={() => <FavoriteUsersRightButton type={type} favoriteUserId={item.id} pressHandler={pressHandler} />}
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