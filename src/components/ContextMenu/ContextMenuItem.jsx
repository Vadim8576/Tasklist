import { observer } from "mobx-react-lite";
import { Menu } from 'react-native-paper';
import { StyleSheet } from "react-native";


export default ContextMenuItem = observer(({
  items
}) => {

  return (
    <>
      {
        items.map((item) => (
          <Menu.Item
            key={item.title}
            leadingIcon={item.icon}
            onPress={item.onPress}
            title={item.title}
            titleStyle={styles.title}
          />
        ))
      }
    </>
  )
})



const styles = StyleSheet.create({
  title: {
    fontSize: 13
  },
})