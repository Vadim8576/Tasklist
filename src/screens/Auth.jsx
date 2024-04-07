import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite";
import { Pressable, StyleSheet, Text, View } from "react-native"
import { RadioButton } from 'react-native-paper';
import { colors } from "../const/constants"
import authStore from '../store/authStore'
import { useTheme, Button, TextInput } from 'react-native-paper';
import Input from "../UI/Input";


export default Auth = observer(({ navigation, route }) => {
  const theme = useTheme();
  const { singIn } = authStore

  const [email, setEmail] = useState('1@mail.ru')
  const [password, setPassword] = useState('123456')
  
  const newEmail = route.params?.email || null
  const newPassword = route.params?.password || null

  const onSubmit = async () => {
    await singIn(email.trim(), password.trim())
    navigation.navigate('TabNavigator', { name: 'TabNavigator' })
    // navigation.navigate('FavoriteUsers', { name: 'FavoriteUsers' })
  }


  useEffect(() => {
    if(newEmail && newPassword) {
      setEmail(newEmail)
      setPassword(newPassword)
    }
  }, [newEmail, newPassword])

  // удалить
  useEffect(() => {
    // login(email, password)
  }, [email])

  // удалить
  const changeHandler = (value) => {
    setEmail(value)
  }


  const goToRegistration = () => {
    navigation.navigate('Registration')
  }

  return (
    <View style={
      [
        styles.wrapper,
        { backgroundColor: theme.colors.primary },
      ]}
    >
      <RadioButton.Group onValueChange={value => changeHandler(value)} value={email}>
        <RadioButton.Item label="1@mail.ru" value="1@mail.ru" />
        <RadioButton.Item label="123@gmail.com" value="123@gmail.com" />
        <RadioButton.Item label="321@gmail.com" value="321@gmail.com" />
      </RadioButton.Group>

      <View style={styles.inputContainer}>
        <Input
          labelText='Login'
          placeholderText='Введите email'
          secure={false}
          valueText={email}
          onChange={setEmail}
        />
        <Input
          labelText='Password'
          placeholderText='Введите пароль'
          secure={true}
          valueText={password}
          onChange={setPassword}
        />
        <Button
          style={styles.loginButton}
          mode='contained'
          onPress={onSubmit}
        >
          Войти
        </Button>
        <Button
          textColor={theme.colors.tertiaryContainer}
          // mode='contained'
          onPress={goToRegistration}
        >
          Регистрация
        </Button>
      </View>
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
  input: {
    marginBottom: 10,
    height: 70,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, .3)',
  }
})