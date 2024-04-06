import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  NavigationContainer
} from '@react-navigation/native';

import Auth from './Auth';
import AppBar from '../components/AppBar';
import DialogScreen from './DialogScreen';
import TabNavigator from './TabNavigator';
import SubTaskList from './SubTaskList/SubTaskList';
import FavoriteUsers from './FavoriteUsers/FavoriteUsers';


import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useState } from 'react';



function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? 'FavoriteUsers';

  switch (routeName) {
    case 'FavoriteUsers':
      return 'Мои друзья';
  }
}





const Stack = createNativeStackNavigator();

export default Navigation = ({ combinedTheme }) => {

  // const [screenName, setScreenName] = useState('Авторизация')

  return (
    <NavigationContainer theme={combinedTheme.default}>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}
      >
        <Stack.Screen name='Auth' component={Auth} options={{ title: 'Авторизация' }} />
        <Stack.Screen name='TabNavigator'>
          {(props) => <TabNavigator {...props} />}
        </Stack.Screen>
        <Stack.Screen name='SubTaskList' component={SubTaskList} />
        <Stack.Screen name='DialogScreen' component={DialogScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}