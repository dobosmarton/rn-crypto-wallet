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
  postfix: string;
  isSendOpen: boolean;
  isReceiveOpen: boolean;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const {accounts, isBalanceLoading} = useAccountState();

  const [selectedCurrencyState, setSelectedCurrencyState] =
    useState<CurrencyState>({
      currencyKey: null,
      postfix: '',
      isReceiveOpen: false,
      isSendOpen: false,
    });

  const data = (Object.keys(accounts) as CurrencyKeys[]).map(acc => ({
    name: acc,
    postfix: accounts[acc]?.currencyPostfix ?? '',
    balance: accounts[acc]?.balance ?? '',
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
                      postfix: currency.postfix,
                      currencyKey: currency.name,
                      isSendOpen: false,
                      isReceiveOpen: true,
                    })
                  }
                  onSend={() =>
                    setSelectedCurrencyState({
                      postfix: currency.postfix,
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
        currencyName={selectedCurrencyState.postfix}
        currencyKey={selectedCurrencyState.currencyKey}
        isVisible={!!selectedCurrencyState?.isSendOpen}
        setVisible={isVisilbe =>
          setSelectedCurrencyState(state => ({...state, isSendOpen: isVisilbe}))
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
