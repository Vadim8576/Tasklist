import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite";
import { useTheme, List } from 'react-native-paper';
import { useEffect, useState } from 'react';
import MainContextMenu from './MainContextMenu';
import { useInputDialog } from '../../hooks/useInputDialog';
import InputDialog from './InputDialog';
import { dialogActions } from '../../const/constants';


//MainTaskList
export default ListItem = observer(({ item, navigation }) => {


  const theme = useTheme();

  const mainTask = item

  // const {
  //   showDialog,
  //   hideDialog,
  //   onSubmit,
  //   visible,
  //   title,
  //   setTitle
  // } = useInputDialog({ type: dialogActions.editTaskList, mainTaskId: item.mainTaskId })


  // console.log('listItem mainTaskId = ', item.mainTaskId)


  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);






  // const openDialog = () => {
  //   showDialog(item.title)
  // }

  // console.log('----------------')

  return (
    <>
      <View style={styles.listItemWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'SubTaskList', {
            mainTask,
            name: 'SubTaskList'
          })
          }
        >
          <List.Item
            title={item.title}
            right={props =>
              <MainContextMenu
                menuVisible={menuVisible}
                closeMenu={closeMenu}
                openMenu={openMenu}
                item={item}
              />
            }
          />
        </TouchableOpacity>

      </View>
      {/* <InputDialog
        visible={visible}
        hideDialog={hideDialog}
        onSubmit={onSubmit}
        title={title}
        setTitle={setTitle}
      /> */}
    </>

  )
})



const styles = StyleSheet.create({
  listItemWrapper: {
    borderWidth: 1,
    borderColor: '#999',
    borderStyle: 'solid',
    borderRadius: 3,
    marginBottom: 5
  },
});