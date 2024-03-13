import { ActivityIndicator, Text, View } from "react-native";


const Loading = () => {

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    }}>
      <ActivityIndicator size='large' />
      <Text>Загрузка...</Text>
    </View>
  )
}

export default Loading;