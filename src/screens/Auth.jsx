import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { RadioButton } from 'react-native-paper';
import { colors } from "../const/constants"
import authStore from '../store/authStore'


export default Auth = observer(({ navigation }) => {

  //удалить
  const [email, setEmail] = useState('123@gmail.com')
  const [password, setPassword] = useState('123456')




  const { singIn } = authStore

  const login = (email, password) => {

    singIn(email.trim(), password.trim())
    navigation.navigate('TaskList', { name: 'TaskList' })
  }


  // удалить
  useEffect(() => {
    login(email, password)
  }, [email])

  // удалить
  const changeHandler = (value) => {
    setEmail(value)
  }

  return (
    <View>

      <RadioButton.Group onValueChange={value => changeHandler(value)} value={email}>
        <RadioButton.Item label="123@gmail.com" value="123@gmail.com" />
        <RadioButton.Item label="321@gmail.com" value="321@gmail.com" />
      </RadioButton.Group>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Введите email'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Введите пароль'
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => login(email, password)}
        >
          <Text>Sign In</Text>
        </Pressable>
      </View>

    </View>
  )
})

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: '30%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.ACCENT,
  }
})