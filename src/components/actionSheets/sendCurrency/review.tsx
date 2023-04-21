import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../button';
import {Header} from '../../header';

type Props = {
  isLoading: boolean;
  currencyName: string;
  transactionAmount: string;
  transactionFromAddress: string;
  transactionToAddress: string;
  estimatedGasPrice: string | null;
  onContinue: () => void;
  onBack: () => void;
  setVisible: (isVisible: boolean) => void;
};

export const Review: React.FunctionComponent<Props> = ({
  isLoading,
  currencyName,
  transactionFromAddress,
  transactionToAddress,
  estimatedGasPrice,
  transactionAmount,
  setVisible,
  onContinue,
  onBack,
}) => {
  return (
    <>
      <View>
        <Header
          title={'Review the transaction'}
          type="secondary"
          onBack={onBack}
        />
        <Text style={styles.description}>
          Send a selected amount to the entered address. Make sure you typed the
          address correctly, we can not restore the ammount after a wrongly
          addressed transaction!
        </Text>
      </View>

      <View style={[styles.sectionContainer, styles.transactionContainer]}>
        <View>
          <Text style={styles.label}>Sending transaction from</Text>
          <Text style={styles.value}>{transactionFromAddress}</Text>
        </View>
        <View>
          <Text style={styles.label}>Sending transaction to</Text>
          <Text style={styles.value}>{transactionToAddress}</Text>
        </View>
        <View>
          <Text style={styles.label}>Transaction amount</Text>
          <Text
            style={styles.value}>{`${transactionAmount} ${currencyName}`}</Text>
        </View>
        <View>
          <Text style={styles.label}>Estimated gas fee</Text>
          <Text style={styles.value}>
            {`${estimatedGasPrice} ${currencyName}` ?? 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Button onPress={onContinue} isLoading={isLoading}>
          Send
        </Button>
        <Button
          disabled={isLoading}
          type="tertiary"
          onPress={() => setVisible(false)}>
          Cancel
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 12,
  },
  transactionContainer: {
    paddingBottom: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#474E68',
  },
  label: {
    color: '#474E68',
    lineHeight: 20,
    fontSize: 14,
  },
  value: {
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '700',
  },
});
