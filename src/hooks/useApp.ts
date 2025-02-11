import {createContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import merge from 'deepmerge';
import {adaptNavigationTheme} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDarkTheme = merge(DarkTheme, {});
const CombinedLightTheme = merge(LightTheme, {});

export const PreferencesContext = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});

const useApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isThemeDark, setIsThemeDark] = useState(isDarkMode);

  const theme = isThemeDark ? {...CombinedDarkTheme} : {...CombinedLightTheme};

  useEffect(() => {
    setIsThemeDark(isDarkMode);
  }, [isDarkMode]);

  return {isDarkMode, theme};
};

export default useApp;
