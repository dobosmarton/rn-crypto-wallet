import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {useAccountState} from '../context/account.provider';
import {CurrencyBalance} from '../components/currencyBalance';
import {BottomTabParamList} from '../libs/navigation/bottomTab';
import {BLUE} from '../utils/colors';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const {balance, isBalanceLoading} = useAccountState();

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          {isBalanceLoading ? (
            <ActivityIndicator size={'small'} color={BLUE} />
          ) : (
            <CurrencyBalance
              name="Ethereum"
              balance={`${balance ?? 'NaN'} ETH`}
            />
          )}
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
  content: {
    paddingVertical: 24,
  },
});
