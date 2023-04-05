import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BLUE} from '../utils/colors';

type Props = {};

export const Chip: React.FunctionComponent<PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: BLUE,
    borderRadius: 100,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFF',
  },
});
