import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '../../input';
import {Button} from '../../button';
import {TransactionsErrorMessages} from '../../../hooks/useTransaction';
import {Header} from '../../header';

type Props = {
  isLoading: boolean;
  currencyName?: string;
  transactionAmount: string;
  transactionToAddress: string;
  addressErrorMessage: TransactionsErrorMessages | null;
  estimatedGasPrice: string | null;
  errorMessage: TransactionsErrorMessages | null;
  setTransactionAmount: (amount: string) => void;
  setTransactionToAddress: (address: string) => void;
  onContinue: () => void;
  setVisible: (isVisible: boolean) => void;
};

export const Edit: React.FunctionComponent<Props> = ({
  isLoading,
  currencyName,
  estimatedGasPrice,
  errorMessage,
  transactionAmount,
  setTransactionAmount,
  transactionToAddress,
  addressErrorMessage,
  setTransactionToAddress,
  setVisible,
  onContinue,
}) => {
  return (
    <>
      <View>
        <Header title={`Send ${currencyName}`} type="secondary" />

        <Text style={styles.description}>
          Send a selected amount to the entered address. Make sure you typed the
          address correctly, we can not restore the ammount after a wrongly
          addressed transaction!
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Input
          placeholder="Enter the address"
          value={transactionToAddress}
          onChange={setTransactionToAddress}
          errorMessage={
            addressErrorMessage ? addressErrorMessage.toString() : undefined
          }
          autoFocus
        />
        <Input
          placeholder="Enter the amount"
          keyboardType="numeric"
          value={transactionAmount}
          onChange={setTransactionAmount}
          postfix={currencyName}
          errorMessage={errorMessage ? errorMessage.toString() : undefined}
        />
        {estimatedGasPrice ? (
          <View style={styles.estimatedGasContainer}>
            <Text
              style={
                styles.estimatedGas
              }>{`Estimated gas fee: ${estimatedGasPrice} ${currencyName}`}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.sectionContainer}>
        <Button
          isLoading={isLoading}
          disabled={
            !transactionToAddress ||
            !transactionAmount ||
            !!errorMessage ||
            !!addressErrorMessage
          }
          onPress={onContinue}>
          Review
        </Button>
        <Button type="tertiary" onPress={() => setVisible(false)}>
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
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#474E68',
  },
  estimatedGasContainer: {
    paddingHorizontal: 12,
  },
  estimatedGas: {
    color: '#474E68',
    lineHeight: 20,
    fontSize: 14,
  },
});
