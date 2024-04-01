import { StyleSheet, TextInput, View } from "react-native";
import { observer } from "mobx-react-lite";


export default CustomInput = observer((props) => {

  const {value, onChangeText, placeholder, numberOfLines} = props

  return (
      <TextInput
        multiline={true}
        numberOfLines={numberOfLines}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}    
      />
  )
})


const styles = StyleSheet.create({
  input: {
    
    fontSize: 16,
    borderBottomWidth: 1,
  },
});


