import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
    backgroundColor: '#1C6DD0',
    borderRadius: 100,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFF',
  },
});
