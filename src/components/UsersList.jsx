import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";



export default UserList = observer((users) => {

  const theme = useTheme()

  console.log('UserList users = ', users)
  return (
    <>
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={users.users}
          renderItem={(_) => (
            <View style={styles.avatar}>
              <Avatar.Text
                style={{ backgroundColor: theme.colors.tertiary } }
                size={22}
                label="XD"
              />
            </View>
          )}
          ListFooterComponent={
            <Avatar.Icon
              size={22}
              icon="plus"
              style={{ backgroundColor: theme.colors.primaryContainer }}
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