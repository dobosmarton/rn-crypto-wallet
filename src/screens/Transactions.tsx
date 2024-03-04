import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {SafeArea} from '../components/safeArea';
import {HomeStackParamList} from '../navigation/homeStack';
import {TransactionItem} from '../components/transactions/transactionItem';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '../components/header';
import {useAccountState} from '../hooks/useAccountState';
import {useConfig} from '../hooks/useConfig';

type Props = {};

export const TransactionsScreen: React.FunctionComponent<Props> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'Transactions'>>();
  const {currencyType} = route.params;

  const {getStateSlice} = useAccountState();
  const {currencyPostfix} = useConfig(currencyType);

  const stateSlice = getStateSlice(currencyType);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Header
          title="Transactions"
          type="secondary"
          onBack={navigation.goBack}
        />
      </View>
      <FlatList
        data={stateSlice.history}
        contentContainerStyle={styles.historyView}
        renderItem={({item}) => {
          return (
            <TransactionItem
              item={item}
              currencyPostfix={currencyPostfix}
              currentAddress={stateSlice.account?.address}
            />
          );
        }}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  historyView: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});
