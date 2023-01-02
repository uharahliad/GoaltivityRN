/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './src/redux/store/store';
import 'react-native-gesture-handler';

const AppWrapper = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWrapper);
