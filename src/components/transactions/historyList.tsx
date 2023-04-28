import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {EmptyComponent} from './emptyComponent';
import {TransactionItem} from './transactionItem';
import {HomeStackParamList} from '../../navigation/homeStack';
import {Transaction} from '../../libs/scan';
import {CurrencyTypes, useConfig} from '../../hooks/useConfig';

type Props = {
  currencyType: CurrencyTypes;
  address: string | undefined;
  history: Transaction[];
};

export const TransactionHistory: React.FunctionComponent<Props> = ({
  currencyType,
  address,
  history,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {currencyPostfix} = useConfig(currencyType);

  const navigateToHistory = () => {
    navigation.navigate('Transactions', {currencyType});
  };

  const renderHeader = () => (
    <View style={styles.headerView}>
      <Text style={styles.headerText}>Transactions</Text>
      {history.length > 3 ? (
        <Pressable onPress={navigateToHistory}>
          <Text style={styles.showAllText}>Show All</Text>
        </Pressable>
      ) : null}
    </View>
  );

  const dataPreview = history.slice(0, 3);

  return (
    <FlatList
      data={dataPreview}
      contentContainerStyle={styles.historyView}
      ListHeaderComponent={renderHeader}
      ListHeaderComponentStyle={styles.listHeaderComponentStyle}
      scrollEnabled={false}
      ListEmptyComponent={EmptyComponent}
      renderItem={({item}) => (
        <TransactionItem
          item={item}
          currentAddress={address}
          currencyPostfix={currencyPostfix}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  historyView: {
    paddingHorizontal: 16,
  },
  listHeaderComponentStyle: {
    paddingVertical: 16,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
  },
  showAllText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
