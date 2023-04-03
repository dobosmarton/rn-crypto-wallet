import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../../screens/Home';
import {AccountScreen} from '../../screens/Account';
import HomeIcon from '../../../icons/home.svg';
import AccountIcon from '../../../icons/account.svg';

export type BottomTabParamList = {
  Home: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FunctionComponent = () => {
  const tabBarIcon = (routeName: string, color: string) => {
    switch (routeName) {
      case 'Home':
        return <HomeIcon width={20} height={20} color={color} />;
      case 'Account':
        return <AccountIcon width={20} height={20} color={color} />;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => tabBarIcon(route.name, color),
        tabBarActiveTintColor: '#10A19D',
        tabBarInactiveTintColor: '#474E68',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
