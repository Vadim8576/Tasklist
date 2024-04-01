
import { observer } from "mobx-react-lite";
import { StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';
import errorStore from "../store/errorStore";


export default AddButton = observer(({
  navigation,
  type,
  taskListId = null,
  screenName
}) => {

  const visible = !errorStore.message.isError && !errorStore.message.isSuccess

  if (!visible) return null

  return (
    <FAB
      size='medium'
      icon='plus'
      style={styles.fab}
      onPress={() => navigation.navigate(
        'DialogScreen', {
        type,
        taskListId,
        screenName
      })}
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