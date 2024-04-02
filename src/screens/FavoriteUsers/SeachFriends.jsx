
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { List, useTheme, TextInput } from 'react-native-paper';
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import CustomInput from '../../components/CustomInput';
import { RIGHT_BUTTON_SIZE } from '../../const/constants';
import authStore from '../../store/authStore';
import FoundFriend from './FoundFriend';
import commonStyles from './commonStyles';


export default SeachFriends = observer((props) => {

  const [friendId, setFriendId] = useState('')
  const theme = useTheme()

  console.log('SeachFriends render')

  const onSubmit = () => {

    authStore.getFriendById(friendId)
  }

  const clearInput = () => {
    setFriendId('')
  }



  // y4Q2IaI2TSSAhPEmJGC1SvhnCnz1




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
            right={<TextInput.Icon name="lock-outline" />}
          />
        </View>
        <View style={styles.submit}>
          <Pressable
            disabled={friendId === '' ? true: false}
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

      <FoundFriend clearInput={clearInput} />
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
    flexBasis: 40,
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

});