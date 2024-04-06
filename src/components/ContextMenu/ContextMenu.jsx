import { observer } from "mobx-react-lite";
import { IconButton, Menu } from 'react-native-paper';
import { StyleSheet } from "react-native";


export default ContextMenu = observer(({
  items,
  menuVisible,
  closeMenu,
  openMenu
}) => {


  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchorPosition='bottom'
      anchor={
        <IconButton
          icon="dots-vertical"
          size={15}
          onPress={openMenu}
        />
      }
    >
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
    </Menu>
  )
})


const styles = StyleSheet.create({
  title: {
    fontSize: 13
  },
})