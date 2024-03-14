import { observer } from "mobx-react-lite";
import { Text, View } from "react-native";


export default SubTaskList = observer(({ route, navigation }) => {
  
  const { item } = route.params;


  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
})



