import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {CurrencyKeys, useAccountState} from '../context/account.provider';
import {BottomTabParamList} from '../navigation/bottomTab';
import {BLUE} from '../utils/colors';
import {Pager} from '../components/pager';
import {CurrencyCard} from '../components/currencyCard';
import {SendCurrencySheet} from '../components/actionSheets/sendCurrency';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

type CurrencyState = {
  currencyKey: CurrencyKeys | null;
  name: string;
  isSendOpen: boolean;
  isReceiveOpen: boolean;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const {accounts, isBalanceLoading} = useAccountState();

  const [selectedCurrencyState, setSelectedCurrencyState] =
    useState<CurrencyState>({
      currencyKey: null,
      name: '',
      isReceiveOpen: false,
      isSendOpen: false,
    });

  const data = (Object.keys(accounts) as CurrencyKeys[]).map(acc => ({
    name: acc,
    currencyName: accounts[acc]?.currencyPostfix ?? '',
    balance: accounts[acc]?.balanceText ?? '',
  }));

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          {isBalanceLoading ? (
            <ActivityIndicator size={'small'} color={BLUE} />
          ) : (
            <Pager>
              {data.map(currency => (
                <CurrencyCard
                  key={currency.name}
                  currency={currency}
                  onReceive={() =>
                    setSelectedCurrencyState({
                      name: currency.currencyName,
                      currencyKey: currency.name,
                      isSendOpen: false,
                      isReceiveOpen: true,
                    })
                  }
                  onSend={() =>
                    setSelectedCurrencyState({
                      name: currency.currencyName,
                      currencyKey: currency.name,
                      isSendOpen: true,
                      isReceiveOpen: false,
                    })
                  }
                />
              ))}
            </Pager>
          )}
        </View>
      </View>

      <SendCurrencySheet
        currencyName={selectedCurrencyState.name}
        currencyKey={selectedCurrencyState.currencyKey}
        isVisible={!!selectedCurrencyState?.isSendOpen}
        setVisible={isVisilbe =>
          setSelectedCurrencyState(state => ({...state, isSendOpen: isVisilbe}))
        }
        onContinue={async () => {}}
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
