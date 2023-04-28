import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Web3 from 'web3';
import ArrowUp from '../../../assets/icons/arrow-up.svg';
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import {BLUE} from '../../utils/colors';
import {CopyableText} from '../textViews/copyableText';
import {Transaction} from '../../libs/scan';

type Props = {
  currentAddress: string | undefined;
  currencyPostfix: string | undefined;
  item: Transaction;
};

export const TransactionItem: React.FunctionComponent<Props> = ({
  item,
  currencyPostfix,
  currentAddress,
}) => {
  const getFormattedAddress = (address: string) => {
    const length = address.length;
    return `${address.slice(0, 4)}...${address.slice(length - 6, length)}`;
  };

  const getTimeStamp = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);

    return date.toLocaleDateString();
  };

  const isReceived = currentAddress === item.to;

  return (
    <View key={item.hash} style={styles.historyItem}>
      <View style={styles.historyInfoContainer}>
        {isReceived ? (
          <ArrowDown width={24} height={24} color={BLUE} />
        ) : (
          <ArrowUp width={24} height={24} color={BLUE} />
        )}
        <View style={styles.transactionInfo}>
          <CopyableText
            textStyle={styles.addressText}
            text={getFormattedAddress(isReceived ? item.from : item.to)}
          />

          <Text>{getTimeStamp(parseInt(item.timeStamp, 10))}</Text>
        </View>
      </View>
      <Text style={styles.valueText}>{`${Web3.utils.fromWei(
        item.value,
      )} ${currencyPostfix}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  historyInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  historyItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionInfo: {
    gap: 6,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
