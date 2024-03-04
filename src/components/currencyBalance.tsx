import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GREEN, WHITE} from '../utils/colors';

type Props = {
  name: string;
  balance: string;
  postfix: string;
};

export const CurrencyBalance: React.FunctionComponent<Props> = ({
  name,
  balance,
  postfix,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceRow}>
        <Text numberOfLines={1} style={styles.balance}>
          {balance}
        </Text>
        <Text style={styles.balance}>{postfix}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 2,
  },
  balanceRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
  },
  balance: {
    fontSize: 40,
    fontWeight: '900',
    color: GREEN,
    maxWidth: '50%',
  },

  name: {
    fontSize: 24,
    fontWeight: '400',
    color: WHITE,
  },
});
