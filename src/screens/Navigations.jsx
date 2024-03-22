import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

import MainTaskList from './MainTaskList/MainTaskList';
import Auth from './Auth';
import AppBar from '../components/AppBar';
import SubTaskList from './SubTaskList/SubTaskList';
import InputDialog from '../components/InputDialog';


const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);


const Stack = createNativeStackNavigator();


export const Navigation = () => {



  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <AppBar {...props} />,
          }}>
          <Stack.Screen name='Auth' component={Auth} options={{ title: 'Авторизация' }} />
          <Stack.Screen name='MainTaskList' component={MainTaskList} options={{ title: 'Список дел' }} />
          <Stack.Screen name='SubTaskList' component={SubTaskList} options={{ title: 'Подсписок дел' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}