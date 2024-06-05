
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import SeachUsers from './SeachUsers';
import FavoriteUserList from './FavoriteUserList';
import usersStore from '../../store/usersStore';

export default FavoriteUsers = observer(() => {

  console.log('Favorite Users render')


  const theme = useTheme()

  const { user } = useAuth()
  const userId = user.uid





  useEffect(() => {
    if (!userId) return
    usersStore.getFavoriteUsers(userId)
  }, [userId])




  return (
    <View style={styles.container}>
      <SeachUsers favoriteUsers={usersStore.favoriteUsers} userId={userId} />
      <FavoriteUserList type='DELETE' favoriteUsers={usersStore.favoriteUsers} userId={userId} />
    </View>
  );
})


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,

  },
});