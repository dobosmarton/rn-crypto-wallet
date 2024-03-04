import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/Login';
import {CreateWalletScreen} from '../screens/CreateWallet';
import {BottomTabNavigator} from './bottomTab';
import {RestoreWalletScreen} from '../screens/RestoreWallet';
import {useAccountState} from '../hooks/useAccountState';

export type RootStackParamList = {
  Login: undefined;
  CreateWallet: undefined;
  LoggedIn: undefined;
  RestoreWallet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationRoot: React.FunctionComponent = () => {
  const {hasAccount} = useAccountState();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        {!hasAccount() ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
            <Stack.Screen
              name="RestoreWallet"
              component={RestoreWalletScreen}
            />
          </>
        ) : (
          <Stack.Screen name="LoggedIn" component={BottomTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
