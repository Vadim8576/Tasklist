
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { List, useTheme, Avatar, Icon } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import authStore from '../../store/authStore';
import commonStyles from './commonStyles';
import { useAuth } from '../../hooks/useAuth';



export default FoundFriends = observer(({foundFriend, clearInput}) => {

  const theme = useTheme()

  const {user} = useAuth()

  console.log('FoundFriends render')
  console.log('foundFriend = ', foundFriend)



  const addFriend = () => {
    authStore.addFriend({userId: user.uid, friendId: authStore.foundFriend?.id})
    clearInput()
  }

  // if(!authStore.foundFriend?.nickName && !authStore.foundFriend?.id) return null
  // if(authStore.foundFriend = {}) return null


    // y4Q2IaI2TSSAhPEmJGC1SvhnCnz1

  return (
    <View style={[
      // { backgroundColor: theme.colors.primaryContainer },
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
          <Avatar.Text size={30} label={foundFriend.nickName.substring(0, 1)} />
        )}
        right={() => (
          <Pressable
            onPress={addFriend}
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