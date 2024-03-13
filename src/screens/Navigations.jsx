import {createNativeStackNavigator} from '@react-navigation/native-stack'
// import {NavigationContainer} from '@react-navigation/native'


import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  MD2LightTheme,
  MD2DarkTheme,
} from 'react-native-paper';


import TaskList from './TaskList';
import { Auth } from './Auth';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Auth' component={Auth} options={{ title: 'Авторизация' }} />
        <Stack.Screen name='TaskList' component={TaskList} options={{ title: 'Список дел' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}