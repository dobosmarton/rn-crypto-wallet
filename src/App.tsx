/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

// web3js is not entirely compatible with RN
import './utils/base64';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {LoginScreen} from './screens/Login';
import {HomeScreen} from './screens/Home';
import {CreateWalletScreen} from './screens/CreateWallet';
import {AccountProvider} from './context/account.provider';

export type RootStackParamList = {
  Login: undefined;
  CreateWallet: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <AccountProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AccountProvider>
    </SafeAreaProvider>
  );
}

export default App;
