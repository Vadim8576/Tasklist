
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { List, useTheme, TextInput, HelperText } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import CustomInput from '../../components/CustomInput';
import { RIGHT_BUTTON_SIZE } from '../../const/constants';
import FoundUser from './FoundUser';
import commonStyles from './commonStyles';
import { useAuth } from '../../hooks/useAuth';
import { useSeachFavoriteUser } from '../../hooks/useSeachFavoriteUser';


export default SeachUsers = observer(({ favoriteUsers }) => {
  console.log('SeachFriends render')

  const theme = useTheme()
  const { user } = useAuth()

  const [foundFriend, setFoundFriend] = useState(null)
  const [friendId, setFriendId] = useState('')
  const [error, setError] = useState('')

  const { getFavoriteUser } = useSeachFavoriteUser(favoriteUsers)


  const onSubmit = async () => {
    const [friend, error] = await getFavoriteUser({ friendId, userId: user.uid })
    setError(error)
    setFoundFriend(friend)
  }

  const resetState = () => {
    setFriendId('')
    setError('')
    setFoundFriend(null)
  }

  const friendIdInputHandler = (value) => {
    if (friendId === '') resetState()
    setFriendId(value)
  }


  return (
    <>
      <View style={
        styles.wrapper
      }>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>ID:</Text>
        </View>
        <View style={styles.inputWrapper}>
          <CustomInput
            placeholder='Введите ID пользователя'
            value={friendId}
            onChangeText={friendIdInputHandler}
            multiline={false}
            numberOfLines={1}
            right={
              friendId !== '' && (
                <TextInput.Icon
                  size={20}
                  color={theme.colors.outline}
                  icon="close"
                  onPress={resetState}
                />
              )
            }
          />
        </View>
        <View style={styles.submit}>
          <Pressable
            disabled={friendId === '' ? true : false}
            // disabled={true}
            onPress={onSubmit}
            style={({ pressed }) => [
              { backgroundColor: pressed ? theme.colors.primaryContainer : theme.colors.background },
              styles.pressable,
            ]}
          >
            <List.Icon
              style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
              icon="arrow-right"
            />
          </Pressable>
        </View>
      </View>

      <HelperText style={styles.HelperText} type="error" visible={error !== ''}>
        {error}
      </HelperText>

      {(error === '' && foundFriend) && (
        <FoundUser foundFriend={foundFriend} clearInput={clearInput} />
      )}


    </>
  )
})



const styles = StyleSheet.create({
  wrapper: {
    paddingRight: 10,
    alignContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...commonStyles.wrapper,

  },
  textWrapper: {
    flexGrow: 0,
    flexBasis: RIGHT_BUTTON_SIZE,
    flexShrink: 0,
  },
  text: {
    fontSize: 22,
  },
  inputWrapper: {
    flexGrow: 1,
    flexBasis: 'auto',
    flexShrink: 1,
  },
  submit: {
    flexGrow: 0,
    flexBasis: RIGHT_BUTTON_SIZE,
    flexShrink: 0,
  },

  pressable: commonStyles.pressable,
  HelperText: {
    paddingBottom: 30,
    paddingLeft: RIGHT_BUTTON_SIZE
  }

});