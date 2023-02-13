/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import RootStackNav from './src/navigation/RootStackNav';
import {getMe} from './src/redux/thunks/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const config = {
    screens: {
      EmailVerification: {
        path: 'verify/:token',
        parse: {
          token: token => `${token}`,
        },
      },
    },
  };

  const linking = {
    prefixes: ['goaltivity://', 'https://goaltivity.com'],
    config,
  };

  return (
    <NavigationContainer linking={linking}>
      <RootStackNav />
    </NavigationContainer>
  );
};

export default App;
