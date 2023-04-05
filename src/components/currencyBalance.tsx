import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BLUE} from '../utils/colors';

type Props = {
  name: string;
  balance: string;
};

export const CurrencyBalance: React.FunctionComponent<Props> = ({
  name,
  balance,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>{balance}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  balance: {
    fontSize: 40,
    fontWeight: '900',
    color: BLUE,
  },
  name: {
    fontSize: 24,
    fontWeight: '400',
  },
});
