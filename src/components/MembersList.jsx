
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { List, Avatar, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import commonStyles from '../screens/FavoriteUsers/commonStyles';
import useGetMembersByIds from '../hooks/useGetMembersByIds';
import usersStore from '../store/usersStore';
import appStore from '../store/appStore';




export default MembersList = observer(({members, removeMember}) => {
  const theme = useTheme()





  console.log('MembersList render')



  // console.log('!!!!!!!!!  taskList.groupUsersIds] = ', taskList.groupUsersIds)
  // console.log('appStore.members[taskList.taskListId] = ', appStore.members[taskList.taskListId])


  // const {members} = useGetMembersByIds(appStore.members[taskList.taskListId])

  console.log('MembersList members = ', members)










  return (
    <View style={[
      // { backgroundColor: theme.colors.primaryContainer },
      styles.wrapper
    ]}>
      {/* <Text>Избранные пользователи:</Text> */}
      <FlatList
        data={members}
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
                onPress={() => removeMember(item.id)}
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