import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  name: string;
  balance: string;
};

export const CurrencyCard: React.FunctionComponent<Props> = ({
  name,
  balance,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.balance}>{balance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    width: 260,
    borderRadius: 12,
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 24,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 32,
    fontWeight: '400',
  },
  balance: {
    fontSize: 40,
    fontWeight: '900',
    alignSelf: 'flex-end',
  },
});
