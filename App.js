/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setSignIn} from './src/redux/reducers/signInSlice';
import auth from './src/api/auth';

import RootStackNav from './src/navigation/RootStackNav';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  useEffect(() => {
    (async () => {
      // await EncryptedStorage.clear();
      try {
        const userData = JSON.parse(await EncryptedStorage.getItem('user'));
        if (userData) {
          const validateToken = await auth.ValidateToken(userData.token);
          if (validateToken.status !== 200) {
            await EncryptedStorage.clear();
          } else {
            dispatch(setSignIn(!!userData));
          }
        }
      } catch (e) {
        console.log('Error', e.message);
      }
    })();
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
