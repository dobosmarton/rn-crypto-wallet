import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../../screens/Login';
import {CreateWalletScreen} from '../../screens/CreateWallet';
import {BottomTabNavigator} from './bottomTab';
import {useAccountState} from '../../context/account.provider';
import {RestoreWalletScreen} from '../../screens/RestoreWallet';

export type RootStackParamList = {
  Login: undefined;
  CreateWallet: undefined;
  LoggedIn: undefined;
  RestoreWallet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationRoot: React.FunctionComponent = () => {
  const {account} = useAccountState();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        {!account ? (
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
