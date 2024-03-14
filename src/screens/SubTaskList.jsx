import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FAB } from 'react-native-paper';
import AddTaskDialog from "../components/AddTaskDialog";


export default SubTaskList = observer(({ route, navigation }) => {
  
  const { item } = route.params;

  useEffect(() => {


  })


  return (
    <View style={styles.container}
    >
      <FlatList
        data={['111','222']}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={
              () => console.log(item)
            }
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
      />
      {/* <AddTaskDialog visible={visible} setVisible={setVisible} /> */}
    </View>
  );
})



const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
})