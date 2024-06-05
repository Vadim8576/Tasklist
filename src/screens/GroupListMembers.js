import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, View } from "react-native";
import appStore from "../store/appStore";
import usersStore from "../store/usersStore";
import { useAuth } from "../hooks/useAuth";
import MembersVerticalList from "../components/MembersVerticalList";
import FavoriteUserList from "./FavoriteUsers/FavoriteUserList";
import useGetFavoriteUsers from "../hooks/useGetFavoriteUsers";
import useFavoriteUsersFilter from "../hooks/useFavoriteUsersFilter";
import { Text } from "react-native-paper";





// X4hFQZ8eNwROulLW4BRY4b70gmA3 Коля (текущий)

// y4Q2IaI2TSSAhPEmJGC1SvhnCnz1 Люся

// 17dNpCh4kDX5dhQBPyiOaVEBBxs1 Александр



export default GroupListMembers = observer(({ route, navigation }) => {

  const { taskListId = null } = route.params

  const { user } = useAuth()
  const userId = user.uid


  const members = useGetMembersByIds(appStore.members[taskListId])
  const favoriteUsers = useGetFavoriteUsers(userId)
  const filteredFavoriteUsers = useFavoriteUsersFilter(members, favoriteUsers)


  console.log('FILTER = ', filteredFavoriteUsers)


  const removeMember = (memberId) => {
    // appStore.removeMember({ memberId, taskListId })
  }




  // console.log('GroupListMembers members = ', members)
  // console.log('GroupListMembers favoriteUsers = ', favoriteUsers)



  return (
    <View style={styles.container}>
      {members?.length != 0 && (
        <MembersVerticalList
          removeMember={removeMember}
          members={members}
        />
      )}
      <Text variant="titleMedium">Пригласить участников</Text>
      {favoriteUsers?.length != 0 && (
        <FavoriteUserList type='INVITE' favoriteUsers={filteredFavoriteUsers} />
      )}
    </View>
  )
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
});


