import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  NavigationContainer
} from '@react-navigation/native';

import TaskList from './TaskList/TaskList';
import MyTabView from './TaskList/MyTabView';
import Auth from './Auth';
import AppBar from '../components/AppBar';
import SubTaskList from './SubTaskList/SubTaskList';

const Stack = createNativeStackNavigator();

export default Navigation = ({combinedTheme}) => {
  return (
    <NavigationContainer theme={combinedTheme.default}>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}>
        <Stack.Screen name='Auth' component={Auth} options={{ title: 'Авторизация' }} />
        {/* <Stack.Screen name='TaskList' component={TaskList} options={{ title: 'Список дел' }} /> */}
        <Stack.Screen name='TaskList' component={MyTabView} options={{ title: 'Список дел' }} />
        <Stack.Screen name='SubTaskList' component={SubTaskList} options={{ title: 'Подсписок дел' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}