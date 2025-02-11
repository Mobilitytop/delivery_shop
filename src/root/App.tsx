import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useApp from '../hooks/useApp';
import {store} from '../store';

import Router from './Router';

const App = () => {
  const {isDarkMode, theme} = useApp();

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor={theme?.colors?.background}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <Router theme={theme} />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
