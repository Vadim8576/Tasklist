import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite";
import { Pressable, StyleSheet, Text, View } from "react-native"
import { RadioButton } from 'react-native-paper';
import { colors } from "../const/constants"
import authStore from '../store/authStore'
import { useTheme, Button, TextInput } from 'react-native-paper';


export default Auth = observer(({ navigation }) => {

  //удалить
  // const [email, setEmail] = useState('321@gmail.com')
  const [email, setEmail] = useState('1@mail.ru')
  const [password, setPassword] = useState('123456')

  const theme = useTheme();


  const { singIn } = authStore

  const login = async (email, password) => {

    await singIn(email.trim(), password.trim())
    navigation.navigate('TabNavigator', { name: 'TabNavigator' })
    // navigation.navigate('FavoriteUsers', { name: 'FavoriteUsers' })
  }


  // удалить
  useEffect(() => {
    // login(email, password)
  }, [email])

  // удалить
  const changeHandler = (value) => {
    setEmail(value)
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
        <TextInput
          theme={{ colors: { onSurfaceVariant: theme.colors.surfaceVariant } }}
          textColor={theme.colors.surface}
          cursorColor={theme.colors.background}
          activeUnderlineColor={theme.colors.surface}
          label="Login"
          style={[
            styles.input,
            { backgroundColor: theme.colors.primary },
          ]}
          onChangeText={setEmail}
          value={email}
          placeholder='Введите email'
        />
        <TextInput
          theme={{ colors: { onSurfaceVariant: theme.colors.surfaceVariant } }}
          textColor={theme.colors.surface}
          cursorColor={theme.colors.background}
          activeUnderlineColor={theme.colors.surface}
          label="Password"
          style={[
            styles.input,
            { backgroundColor: theme.colors.primary }
          ]}
          onChangeText={setPassword}
          value={password}
          placeholder='Введите пароль'
          secureTextEntry={true}
        />
        <Button
          style={styles.loginButton}
          mode='contained'
          onPress={() => login(email, password)}
        >
          Войти
        </Button>
        <Button
          textColor={theme.colors.tertiaryContainer}
          // mode='contained'
          onPress={() => login(email, password)}
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
    width: '80%',
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