
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { List, Avatar, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import authStore from '../../store/authStore';
import { RIGHT_BUTTON_SIZE } from '../../const/constants';
import commonStyles from './commonStyles';



export default FavoriteUsers = observer((props) => {
  const theme = useTheme()

  console.log('FriensLisrt render')
  console.log('FriensLisrt friend List = ', authStore.friends)


  return (
    <View style={[
      // { backgroundColor: theme.colors.primaryContainer },
      styles.wrapper
    ]}>
      <Text>Мои друзья:</Text>
      <FlatList
        data={authStore.friends}
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
              <Avatar.Text size={30} label={item.nickName.substring(0, 1)} />
            )}
            right={() => (
              <Pressable
                onPress={() => console.log('Delete press')}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? theme.colors.primaryContainer : theme.colors.background },

                  styles.pressable
                ]}
              >
                <List.Icon
                  color={theme.colors.secondary}
                  style={styles.rightIcon}
                  icon="delete-forever-outline"
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
  submit: {
    flexGrow: 0,
    flexBasis: RIGHT_BUTTON_SIZE,
    flexShrink: 0,
  },
});