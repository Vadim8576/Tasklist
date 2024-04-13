import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, PaperProvider, useTheme } from 'react-native-paper';

export default GroupButton = ({
  addButtonVisible,
  buttonGroupIsOpen,
  setButtonGroupIsOpen,
  checkboxChange = null,
  addTask,
  edit,
  remove
}) => {

  const theme = useTheme()

  const onStateChange = () => setButtonGroupIsOpen(state => !state);

  const open = buttonGroupIsOpen;



  const pressActions = [
    {
      icon: 'check',
      onPress: checkboxChange
    },
    {
      icon: 'pencil',
      onPress: edit
    },
    {
      icon: 'delete',
      onPress: remove
    }
  ]




  return (
    <FAB.Group
      backdropColor='rgba(255, 255, 255, 0)'
      fabStyle={{ backgroundColor: theme.colors.primary }}
      color='white'
      style={styles.group}
      open={buttonGroupIsOpen}
      visible={addButtonVisible}
      icon={!open ? 'plus' : 'chevron-down'}
      // icon={open ? 'calendar-today' : 'plus'}
      actions={pressActions}
      onStateChange={() => open && onStateChange()}
      onPress={() => {
        if (open) {
          console.log('if open')
          return
        }
        console.log('if not open')
        addTask()
      }}
    />
  );
};

const styles = StyleSheet.create({
  group: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },

})