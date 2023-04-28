import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../button';

export const EmptyComponent = () => {
  return (
    <View style={styles.emptyStateView}>
      <View>
        <Text style={styles.emptyStateText}>
          You don't have transactions yet!
        </Text>
        <Text style={styles.emptyStateDescription}>
          All your transactions will show here.
        </Text>
      </View>
      <Button type="tertiary" style={styles.emptyStateAction}>
        Receive transaction
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'center',
  },
  emptyStateDescription: {
    alignSelf: 'center',
    marginTop: 6,
  },
  emptyStateAction: {},
});
