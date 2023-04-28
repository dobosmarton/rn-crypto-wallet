import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/Home';
import {TransactionsScreen} from '../screens/Transactions';
import {CurrencyTypes} from '../hooks/useConfig';

export type HomeStackParamList = {
  HomeInit: undefined;
  Transactions: {
    currencyType: CurrencyTypes;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeInit"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeInit" component={HomeScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
};
