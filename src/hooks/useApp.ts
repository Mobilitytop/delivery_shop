import { useColorScheme } from 'react-native';

const useApp = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return { isDarkMode };
};

export default useApp;
