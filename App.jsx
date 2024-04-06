import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Navigation from './src/Navigations/Navigations';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import AppError from './src/components/AppError';

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const combinedTheme = {
  default: CombinedDefaultTheme,
  Dark: CombinedDarkTheme
}

export default App = () => {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <Navigation combinedTheme={combinedTheme} />
      <AppError />
    </PaperProvider> 
  )
}

