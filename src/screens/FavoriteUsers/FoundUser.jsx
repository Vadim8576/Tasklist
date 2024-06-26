
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { List, useTheme, Avatar, Icon } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import commonStyles from './commonStyles';
import { useAuth } from '../../hooks/useAuth';
import usersStore from '../../store/usersStore';


export default FoundUser = observer(({ foundFriend, clearInput }) => {

  const theme = useTheme()

  const { user } = useAuth()

  console.log('FoundFriends render')

  const addFavoriteUser = () => {
    usersStore.addFavoriteUser({ userId: user.uid, friendId: usersStore.foundFriend?.id })
    clearInput()
  }


  return (
    <View style={[
      styles.wrapper,
    ]}>
      <Text>Найден пользователь:</Text>
      <List.Item
        style={{
          paddingRight: 10,
        }}
        title={foundFriend.nickName}
        description={`ID: ${foundFriend.id}`}
        descriptionStyle={{ fontSize: 12 }}
        left={() => (
          <Avatar.Text
            style={{ backgroundColor: theme.colors.tertiary }}
            size={28}
            label={foundFriend.nickName.substring(0, 1)}
          />
        )}
        right={() => (
          <Pressable
            onPress={addFavoriteUser}
            style={({ pressed }) => [
              { backgroundColor: pressed ? theme.colors.primaryContainer : theme.colors.background },
              styles.pressable
            ]}
          >
            <List.Icon
              color={theme.colors.secondary}
              style={styles.rightIcon}
              icon="plus"
            // size={20}
            />

          </Pressable>
        )}
      />
    </View>
  );
})



const styles = StyleSheet.create({
  ...commonStyles
})