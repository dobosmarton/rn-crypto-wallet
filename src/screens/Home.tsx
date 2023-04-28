import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {BottomTabParamList} from '../navigation/bottomTab';
import {BLUE} from '../utils/colors';
import {Pager} from '../components/pager';
import {CurrencyCard} from '../components/currencyCard';
import {SendCurrencySheet} from '../components/actionSheets/sendCurrency';
import {TransactionHistory} from '../components/transactions/historyList';
import {useAccountState} from '../hooks/useAccountState';
import {CurrencyTypes} from '../hooks/useConfig';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

type CurrencyState = {
  isSendOpen: boolean;
  isReceiveOpen: boolean;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const {state} = useAccountState();

  const [selectedCurrencyState, setSelectedCurrencyState] =
    useState<CurrencyState>({
      isReceiveOpen: false,
      isSendOpen: false,
    });

  const _setActiveCurrency = (active: number) => {
    setSelectedCurrencyState({isSendOpen: false, isReceiveOpen: false});
    setSelectedIndex(active);
  };

  const data = (Object.keys(state) as CurrencyTypes[]).map(acc => ({
    name: acc,
    account: state[acc]?.account ?? null,
    balance: state[acc]?.balance ?? '',
    history: state[acc]?.history ?? [],
    postfix: state[acc]?.currencyPostfix,
  }));

  const isLoading = (Object.keys(state) as CurrencyTypes[]).find(
    acc => state[acc]?.isBalanceLoading,
  );

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={BLUE} />
          ) : (
            <>
              <Pager onPageSelected={_setActiveCurrency}>
                {data.map((currencyData, index) => (
                  <CurrencyCard
                    key={index}
                    name={currencyData.name}
                    balance={currencyData.balance}
                    postfix={currencyData.postfix}
                    onReceive={() =>
                      setSelectedCurrencyState({
                        isSendOpen: false,
                        isReceiveOpen: true,
                      })
                    }
                    onSend={() =>
                      setSelectedCurrencyState({
                        isSendOpen: true,
                        isReceiveOpen: false,
                      })
                    }
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

      <SendCurrencySheet
        account={data[selectedIndex].account}
        currencyName={data[selectedIndex].postfix}
        currencyKey={data[selectedIndex].name}
        isVisible={!!selectedCurrencyState?.isSendOpen}
        setVisible={isVisilbe =>
          setSelectedCurrencyState(_state => ({
            ..._state,
            isSendOpen: isVisilbe,
          }))
        }
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
