import React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

import paths from '../constants/paths';

const Stack = createNativeStackNavigator();

type RouterProps = {
  theme: Theme;
};

const Router: React.FC<RouterProps> = ({theme}) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={paths.Home}>
        <Stack.Screen name={paths.Home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;