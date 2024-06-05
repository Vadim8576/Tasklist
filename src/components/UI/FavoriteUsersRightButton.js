import { observer } from "mobx-react-lite"
import { Pressable, StyleSheet } from "react-native"
import { List, useTheme } from "react-native-paper"
import commonStyles from "../../screens/FavoriteUsers/commonStyles"

export default FavoriteUsersRightButton = observer(({type, favoriteUserId, pressHandler}) => {
  const theme = useTheme()

  const getIcon = (type) => {
    if (type === 'INVITE') return (
      <List.Icon
        color={theme.colors.secondary}
        style={styles.rightIcon}
        icon="plus"
      />
    )
  
    if (type === 'DELETE') return (
      <List.Icon
        color={theme.colors.secondary}
        style={styles.rightIcon}
        icon="close"
      />
    )
  }




  return (
    <Pressable
      onPress={() => pressHandler(favoriteUserId)}
      style={({ pressed }) => [
        { backgroundColor: pressed ? theme.colors.primaryContainer : theme.colors.background },
        styles.pressable
      ]}
    >
      {getIcon(type)}
    </Pressable>
  )
})







const styles = StyleSheet.create({
  ...commonStyles,
  description: {
    fontSize: 12,
  },
})