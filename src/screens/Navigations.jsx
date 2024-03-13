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

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

import TaskList from './TaskList';
import { Auth } from './Auth';
import NavigationAppBar from '../components/NavigationAppBar';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
     <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Stack.Navigator
          screenOptions={{
          header: (props) => <NavigationAppBar {...props} />,
        }}>
          <Stack.Screen name='Auth' component={Auth} options={{ title: 'Авторизация' }} />
          <Stack.Screen name='TaskList' component={TaskList} options={{ title: 'Список дел' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  )
}