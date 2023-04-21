import React, {useEffect} from 'react';
import {ActionSheet} from './actionSheet';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '../input';
import {Button} from '../button';
import {
  CurrencyKeys,
  ExtendedAccount,
  useAccountState,
} from '../../context/account.provider';
import {useTransaction} from '../../hooks/useTransaction';

type Props = {
  currencyName: string;
  currencyKey: CurrencyKeys | null;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  onContinue: () => Promise<void>;
};

export const SendCurrencySheet: React.FunctionComponent<Props> = ({
  currencyName,
  currencyKey,
  isVisible,
  setVisible,
  onContinue,
}) => {
  const {accounts, account} = useAccountState();

  const {
    errorMessage,
    estimatedGasPrice,
    transactionAmount,
    setTransactionAmount,
  } = useTransaction({
    account,
    currencyInstance:
      currencyKey && accounts[currencyKey]
        ? (accounts[currencyKey] as ExtendedAccount).instance
        : null,
  });

  useEffect(() => {
    if (!isVisible) {
      setTransactionAmount('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <ActionSheet isVisible={isVisible} setVisible={setVisible}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>{`Send ${currencyName}`}</Text>
        <Text style={styles.description}>
          Send a selected amount to the entered address. Make sure you typed the
          address correctly, we can not restore the ammount after a wrongly
          addressed transaction!
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Input
          placeholder="Type the address"
          value={''}
          onChange={() => {}}
          autoFocus
        />
        <Input
          placeholder="Type the amount"
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
              }>{`Estimated gas price: ${estimatedGasPrice} ${currencyName}`}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.sectionContainer}>
        <Button onPress={() => onContinue()}>Continue</Button>
        <Button type="tertiary" onPress={() => setVisible(false)}>
          Cancel
        </Button>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#474E68',
  },
  estimatedGasContainer: {
    paddingHorizontal: 12,
    color: '#474E68',
    lineHeight: 20,
    fontSize: 14,
  },
  estimatedGas: {},
});
