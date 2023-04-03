import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {useAccountState} from '../context/account.provider';
import {CurrencyCard} from '../components/currencyCard';
import {BottomTabParamList} from '../libs/navigation/bottomTab';
import {Header} from '../components/header';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const {balance} = useAccountState();

  return (
    <SafeArea>
      <View style={styles.container}>
        <Header title="Wallet" type="primary" />

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
    paddingVertical: 18,
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
