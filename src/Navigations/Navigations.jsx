import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  NavigationContainer
} from '@react-navigation/native';

import { useState } from 'react';

import Auth from '../screens/Auth';
import AppBar from '../components/AppBar';
import DialogScreen from '../screens/DialogScreen';
import TabNavigator from './TabNavigator';
import SubTaskList from '../screens/SubTaskList/SubTaskList';
import Registration from '../screens/Registration';
import GroupListMembers from '../screens/GroupListMembers';


const Stack = createNativeStackNavigator();

export default Navigation = ({ combinedTheme }) => {

  const [screenTitle, setScreenTitle] = useState('')

  return (
    <NavigationContainer theme={combinedTheme.default}>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          header: (props) => <AppBar {...props} screenTitle={screenTitle} />,
        }}
      >
        <Stack.Screen name='Auth' component={Auth} options={{ title: 'Авторизация' }} />
        <Stack.Screen name='Registration' component={Registration} options={{ title: 'Регистрация' }} />
        <Stack.Screen name='TabNavigator'>
          {(props) => <TabNavigator {...props} setScreenTitle={setScreenTitle} />}
        </Stack.Screen>
        <Stack.Screen name='SubTaskList' component={SubTaskList} />
        <Stack.Screen name='DialogScreen' component={DialogScreen} />
        <Stack.Screen name='GroupListMembers' component={GroupListMembers} options={{ title: 'Участники' }} />
        
      </Stack.Navigator>
    </NavigationContainer >
  )
}