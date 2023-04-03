/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

// web3js is not entirely compatible with RN
import './utils/base64';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AccountProvider} from './context/account.provider';
import {NavigationRoot} from './libs/navigation';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <AccountProvider>
        <NavigationRoot />
      </AccountProvider>
    </SafeAreaProvider>
  );
}

export default App;
