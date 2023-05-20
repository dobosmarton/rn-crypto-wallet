import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {BottomTabParamList} from '../navigation/bottomTab';
import {BLUE} from '../utils/colors';
import {Pager} from '../components/pager';
import {CurrencyCard} from '../components/currencyCard';
import {TransactionSheet} from '../components/actionSheets/transactionSheet';
import {TransactionHistory} from '../components/transactions/historyList';
import {useAccountState} from '../hooks/useAccountState';
import {CurrencyTypes} from '../hooks/useConfig';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const {state} = useAccountState();

  const [isSendOpen, setSendOpen] = useState(false);

  const _setActiveCurrency = (active: number) => {
    setSendOpen(false);
    setSelectedIndex(active);
  };

  const data = Object.keys(state).map(acc => ({
    name: acc as CurrencyTypes,
    account: state[acc]?.account ?? null,
    balance: state[acc]?.balance ?? '',
    history: state[acc]?.history ?? [],
    postfix: state[acc]?.currencyPostfix,
  }));

  const isLoading = Object.values(state).some(value => value.isBalanceLoading);

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={BLUE} />
          ) : (
            <>
              <Pager onPageSelected={_setActiveCurrency}>
                {data.map(currencyData => (
                  <CurrencyCard
                    key={currencyData.name}
                    name={currencyData.name}
                    balance={currencyData.balance}
                    postfix={currencyData.postfix}
                    onReceive={() => ({})}
                    onSend={() => setSendOpen(true)}
                  />
                ))}
              </Pager>

              <TransactionHistory
                currencyType={data[selectedIndex].name}
                address={data[selectedIndex].account?.address}
                history={data[selectedIndex].history}
              />
            </>
          )}
        </View>
      </View>

      <TransactionSheet
        account={data[selectedIndex].account}
        currencyName={data[selectedIndex].postfix}
        currencyKey={data[selectedIndex].name}
        isVisible={isSendOpen}
        setVisible={setSendOpen}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    paddingVertical: 24,
  },
});
