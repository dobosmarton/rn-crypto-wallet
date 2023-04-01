import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {useAccountState} from '../context/account.provider';
import {CurrencyCard} from '../components/currencyCard';
import {Button} from '../components/button';
import {RootStackParamList} from '../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FunctionComponent<Props> = ({navigation}) => {
  const {balance, signOut} = useAccountState();

  const _signOut = () => {
    signOut();
    navigation.popToTop();
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wallet</Text>
          <Button type="tertiary" onPress={_signOut}>
            Sign out
          </Button>
        </View>
        <View style={styles.content}>
          <CurrencyCard name="Ethereum" balance={`${balance ?? 'NaN'} ETH`} />
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  content: {
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
  signOut: {
    fontSize: 18,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: '400',
  },
});
