
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { List, useTheme, TextInput, HelperText } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useEffect, useState } from 'react';
import CustomInput from '../../components/CustomInput';
import { RIGHT_BUTTON_SIZE } from '../../const/constants';
import authStore from '../../store/authStore';
import FoundFriend from './FoundFriend';
import commonStyles from './commonStyles';
import { useAuth } from '../../hooks/useAuth';


export default SeachFriends = observer(() => {
  const theme = useTheme()
  const { user } = useAuth()

  const [foundFriend, setFoundFriend] = useState(null)
  const [friendId, setFriendId] = useState('')
  const [errorText, setErrorText] = useState('')
  

  console.log('SeachFriends render')


  const onSubmit = async () => {
    if (friendId === user.uid) {
      setErrorText('Это ваш ID!')
      return
    }

    const found = await authStore.getFriendById(friendId)
    setFoundFriend(found)

    if (found === null) {
      setErrorText('Пользователь с таким ID не существует!')
    }
  }


  
  const clearInput = () => {
    setFriendId('')
    setErrorText('')
    setFoundFriend(null)
  }

  useEffect(() => {
    if(friendId.length === 0) clearInput()
  }, [friendId])



  // useEffect(() => {
  //   if(errorText !== '') setTimer(new Date)

  //   const interval = setInterval(() => {
  //     const newDate = new Date - timer
  //     console.log(newDate)
  //     // if(newDate >= )
  //   }, 1000);


  //   return clearInterval(interval)

  // }, [errorText])


  // y4Q2IaI2TSSAhPEmJGC1SvhnCnz1
  // 17dNpCh4kDX5dhQBPyiOaVEBBxs1



  return (
    <>
      <View style={[
        styles.wrapper,
        { paddingRight: 10 },
      ]}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>ID:</Text>
        </View>
        <View style={styles.inputWrapper}>
          <CustomInput
            placeholder='Введите ID друга'
            value={friendId}
            onChangeText={setFriendId}
            multiline={false}
            numberOfLines={1}
            right={
              friendId.length && (
                <TextInput.Icon
                  size={20}
                  color={theme.colors.outline}
                  icon="close"
                  onPress={clearInput}
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

      <HelperText style={styles.HelperText} type="error" visible={errorText !== ''}>
        {errorText}
      </HelperText>

      {(errorText === '' && foundFriend) && <FoundFriend foundFriend={foundFriend} clearInput={clearInput} />}


    </>
  );
})



const styles = StyleSheet.create({
  wrapper: {
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
  HelperText : {
    paddingBottom: 30,
    paddingLeft: RIGHT_BUTTON_SIZE
  }

});