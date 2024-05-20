import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme, IconButton, Text } from 'react-native-paper';


export default GroupButton = ({ buttonGroup }) => {

  const {
    buttonVisible,
    addTask,
    selectedItemsIds,
    setIdsOfSelectedItems,
    selectionMode,
    setSelectionMode,
    checkboxChange = null,
    clearSelection,
    edit,
    remove,
    removeSelected,
    buttonGroupIsOpen,
    hide,
    show
  } = buttonGroup

  // console.log('buttonVisible = ', buttonGroup.buttonVisible)




  const theme = useTheme()

  const open = buttonGroupIsOpen;

  const onStateChange = () => {

    if (!open && selectedItemsIds.length === 1) {
      show()
    } else {
      hide()
    }
  }



  const pressActions = [
    {
      icon: 'pencil',
      onPress: () => {
        edit()
        clearSelection()
      }
    },
    {
      icon: 'delete',
      onPress: () => {
        remove()
        clearSelection()
      }
    }
  ]



  return (
    <FAB.Group
      backdropColor='rgba(255, 255, 255, 0)'
      fabStyle={{ backgroundColor: theme.colors.primary }}
      color='white'
      style={styles.group}
      open={buttonGroupIsOpen}
      visible={buttonVisible}
      icon={
        selectedItemsIds.length === 0
          ? 'plus'
          : selectedItemsIds.length === 1 ? 'chevron-up'
            : 'delete'
      }
      actions={pressActions}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          //console.log('if open')
          return
        }
        //console.log('if not open')

        if(selectedItemsIds.length > 1) {
          removeSelected()
          clearSelection()
        }
        if(selectedItemsIds.length === 0) addTask()

        

      }}
    />
  )
};

const styles = StyleSheet.create({
  group: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  deleteMenu: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#999',
  }

})