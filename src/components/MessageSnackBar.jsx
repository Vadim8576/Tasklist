
import { View } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';


export default MessageSnackBar = ({
  message,
  onDismissSnackBar
}) => {

  const theme = useTheme()
  const visible = message.isError || message.isSuccess

  return (
    <View>
      <Snackbar
        style={{
          backgroundColor: message.isError ? theme.colors.error : 'green'
        }}
        visible={visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        {message.text}
      </Snackbar>
    </View>
  );
};



