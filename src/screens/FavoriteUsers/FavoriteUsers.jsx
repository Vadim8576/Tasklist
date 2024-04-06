
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { List, Button, Avatar, TouchableRipple, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useState } from 'react';
import authStore from '../../store/authStore';
import { useAuth } from '../../hooks/useAuth';
import CustomInput from '../../components/CustomInput';
import { RIGHT_BUTTON_SIZE } from '../../const/constants';
import SeachFriends from './SeachFriends';
import FriendsList from './FriendsList';

export default FavoriteUsers = observer((props) => {

  const { navigation } = props

  const [friendId, setFriendId] = useState()

  console.log('Favorite Users render')

  const theme = useTheme()

  const { user } = useAuth()
  const userId = user.uid




  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'Мои друзья'
  //   })
  // }, [])




  useEffect(() => {

    // authStore.createUser()
    if (!userId) return

    authStore.getFriends(userId)

  }, [userId])

  // const {value, onChangeText, placeholder} = props


  return (
    <View style={styles.container}>
      <SeachFriends />
      <FriendsList />
    </View>
  );
})


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 5,
    paddingRight: 5,

  },
});