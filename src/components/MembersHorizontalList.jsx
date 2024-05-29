import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { observer } from "mobx-react-lite";



export default MembersHorizontalList = observer(({ members, size = 20, showModal }) => {

  const theme = useTheme()


  console.log('MembersHorizontalList members = ', members)

  if (members.length === 0) return null

  return (
    <>
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={members}
          renderItem={({ item }) => (
            <View
              // key={item.id}
              style={styles.avatar}
            >
              <Pressable
                onPress={() => console.log('MembersHorizontalList Press!')}
              >
                <Avatar.Text
                  style={{ backgroundColor: theme.colors.primaryContainer }}
                  size={size}
                  label={item.nickName.substring(0, 1)}
                />
              </Pressable>

            </View>
          )}
          ListFooterComponent={
            <Pressable
              onPress={showModal}
            >
              <Avatar.Icon
                size={size}
                icon="plus"
                style={{ backgroundColor: theme.colors.primary }}
                color={theme.colors.surface}
              />
            </Pressable>

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