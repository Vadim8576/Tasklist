import { useEffect, useState } from "react"
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { colors } from "../const/constants"
import { singIn } from "../api/firebase"
import { useAuth } from "../hooks/useAuth"
import { reauthenticateWithPopup } from "firebase/auth"

export const Auth = ({ navigation }) => {

  const { isLoggedIn, user } = useAuth()

  const [email, setEmail] = useState('123@gmail.com')
  const [password, setPassword] = useState('123456')
  // console.log('user email ' ,user.email)
  // console.log('user id APP' ,user.uid)


  const login = async (email, password) => {
    await singIn(email, password)

    navigation.navigate('TaskList')
  }

  useEffect(() => {
    login(email, password)
  }, [])


  return (
    <View>
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
}

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
});