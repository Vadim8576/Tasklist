import React from 'react';
import { Text, View } from 'react-native';

const Header = ({userEmail}) => {

  return (
    <View style={{
      paddingTop: 60,
    }}>
      <Text>{userEmail}</Text>
    </View>
  );
}


export default Header;