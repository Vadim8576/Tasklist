
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Avatar, TouchableRipple } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useState } from 'react';
import authStore from '../../store/authStore';
import { useAuth } from '../../hooks/useAuth';
import CustomInput from '../../components/CustomInput';

export default FavoriteUsers = observer((props) => {

  const { navigation } = props

  const [friendId, setFriendId] = useState()

  console.log('Favorite Users render')


  const { user } = useAuth()
  const userId = user.uid



  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Мои друзья'
    })
  }, [])




  useEffect(() => {

    // authStore.createUser()
    if (!userId) return

    authStore.getFriends(userId)

  }, [userId])

  // const {value, onChangeText, placeholder} = props


  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <CustomInput
            placeholder='Введите ID друга'
            value={friendId}
            onChangeText={setFriendId}
            numberOfLines={1}
          />
          {/* <TouchableRipple
            onPress={() => console.log('Pressed')}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Avatar.Icon size={32} icon="plus" />
          </TouchableRipple> */}


        </View>


        <FlatList
          data={authStore.friends}
          renderItem={({ item }) => (
            <List.Item
              key={item.id}
              title={item.nickName}
              right={props => <List.Icon {...props} icon="delete-forever-outline" />
              }
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
      {/* <AddButton
        navigation={navigation}
        type={dialogActions.addTaskList}
        screenName={screenName}
      /> */}
    </>

  );
})





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,

  },
  inputWrapper: {
    // flexDirection: 'row'
  },
  footer: {
    height: 90
  }
});