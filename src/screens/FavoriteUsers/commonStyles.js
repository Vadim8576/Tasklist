import { StyleSheet } from 'react-native';
import { RIGHT_BUTTON_SIZE } from '../../const/constants';


export default styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 0,
    paddingLeft: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
  pressable: {
    borderRadius: RIGHT_BUTTON_SIZE / 2,
    height: RIGHT_BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightIcon: {
    width: RIGHT_BUTTON_SIZE,
  },
})