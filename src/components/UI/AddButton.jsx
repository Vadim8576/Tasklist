
import { observer } from "mobx-react-lite";
import { StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';


export default AddButton = observer(({
  addButtonVisible,
  addButtonOnPress
}) => {


  if (!addButtonVisible) return null

  return (
    <FAB
      size='medium'
      icon='plus'
      style={styles.fab}
      onPress={addButtonOnPress}
    />
  );
})


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
})