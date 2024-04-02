import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  NavigationContainer
} from '@react-navigation/native';

import Auth from './Auth';
import AppBar from '../components/AppBar';
import DialogScreen from './DialogScreen';
import TabNavigator from '../TabNavigator';
import SubTaskList from './SubTaskList/SubTaskList';
import FavoriteUsers from './FavoriteUsers/FavoriteUsers';


const Stack = createNativeStackNavigator();

export default Navigation = ({combinedTheme}) => {
  return (
    <NavigationContainer theme={combinedTheme.default}>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}>
        <Stack.Screen name='Auth' component={Auth} options={{ title: 'Авторизация' }} />
        <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ title: 'Список задач' }} />
        <Stack.Screen name='SubTaskList' component={SubTaskList} options={{ title: 'Список задач' }} />
        <Stack.Screen name='FavoriteUsers' component={FavoriteUsers} options={{ title: 'Мои друзья' }} />
        <Stack.Screen name='DialogScreen' component={DialogScreen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}