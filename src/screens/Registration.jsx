import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite";
import { StyleSheet, View } from "react-native"
import { useTheme, Button, Text } from 'react-native-paper';
import authStore from '../store/authStore'
import Input from "../UI/Input";


export default Registration = observer(({ navigation }) => {

  const theme = useTheme();

  const [email, setEmail] = useState('2@mail.ru')
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('123456')
  const [repeatPassword, setRepeatPassword] = useState('123456')

  onSubmit = () => {
    authStore.createUser({ email, password, nickName })
  }

  onContinue = () => {
    authStore.setNewUserCreated('no')

    navigation.goBack()
  }

  onError = () => {
    authStore.setNewUserCreated('no')
  }


  useEffect(() => {
    authStore.newUserCreated ? setShowMessage(true) : setShowMessage(false)
  }, [authStore.newUserCreated])



  return (
    <View style={
      [
        styles.wrapper,
        { backgroundColor: theme.colors.primary },
      ]}
    >
      {
        {
          'no': (
            <>
              <View style={styles.inputContainer}>
                <Input
                  labelText='email'
                  placeholderText='Введите email'
                  secure={false}
                  valueText={email}
                  onChange={setEmail}
                />
                <Input
                  labelText='Nickname'
                  placeholderText='Введите Nickname'
                  secure={false}
                  valueText={nickName}
                  onChange={setNickName}
                />
                <Input
                  labelText='Пароль'
                  placeholderText='Введите пароль'
                  secure={true}
                  valueText={password}
                  onChange={setPassword}
                />
                <Input
                  labelText='Повторите пароль'
                  placeholderText='Введите пароль'
                  secure={true}
                  valueText={repeatPassword}
                  onChange={setRepeatPassword}
                />
              </View>
              <Button
                textColor={theme.colors.tertiaryContainer}
                style={styles.button}
                mode='contained'
                onPress={onSubmit}
              >
                Зарегистрироваться
              </Button>
            </>
          ),
          'yes': (
            <>
              <Text
                style={[
                  styles.text,
                  { color: theme.colors.onPrimary }
                ]}
              >
                Вы успешно зарегистрировались!
              </Text>
              <Button
                textColor={theme.colors.tertiaryContainer}
                style={styles.button}
                mode='contained'
                onPress={onContinue}>Войти</Button>
            </>
          ),
          'error': (
            <>
              <Text
                style={[
                  styles.text,
                  { color: theme.colors.onPrimary }
                ]}
              >
                Не удалось зарегистрироваться! Проверьте email и повторите попытку.
              </Text>
              <Button
                textColor={theme.colors.tertiaryContainer}
                style={styles.button}
                mode='contained'
                onPress={onError}>Попробовать</Button>
            </>
          )
        }[authStore.newUserCreated]
      }

    </View>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '70%',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, .3)',
  },
  text: {
    marginBottom: 50
  }
})