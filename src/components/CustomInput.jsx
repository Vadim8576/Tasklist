import { StyleSheet, Text } from "react-native";
import { TextInput, useTheme } from 'react-native-paper'
import { observer } from "mobx-react-lite";


export default CustomInput = observer(({
  value,
  onChangeText,
  placeholder,
  numberOfLines,
  ...props
}) => {

  const theme = useTheme()


  return (
    <TextInput
      {...props}
      numberOfLines={numberOfLines}
      mode='flat'
      style={[
        { backgroundColor: theme.colors.background },
        styles.input,
      ]}
      contentStyle={{
        fontSize: 14,
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    
    />
  )
})

const styles = StyleSheet.create({
  input: {
   
  },
});


