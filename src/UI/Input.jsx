import { StyleSheet } from "react-native"
import { useTheme, TextInput } from 'react-native-paper';


export default Input = ({
  labelText,
  placeholderText,
  secure,
  onChange,
  valueText
}) => {

  const theme = useTheme()


  return (
    <TextInput
      label={labelText}
      placeholder={placeholderText}
      value={valueText}
      onChangeText={onChange}
      secureTextEntry={secure}
      theme={{ colors: { onSurfaceVariant: theme.colors.surfaceVariant } }}
      style={[
        styles.input,
        { backgroundColor: theme.colors.primary },
      ]}
      textColor={theme.colors.surface}
      cursorColor={theme.colors.background}
      activeUnderlineColor={theme.colors.surface}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    height: 70,
    fontSize: 14,
  },
})