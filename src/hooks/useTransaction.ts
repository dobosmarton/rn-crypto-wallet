import {Account} from 'web3-core';
import {CurrencyInstance} from '../libs/currency';
import {useEffect, useState} from 'react';
import {useDebounce} from './useDebounce';

type UseTransaction = (props: {
  account: Account | null;
  currencyInstance: CurrencyInstance | null;
}) => {
  estimatedGasPrice: string | null;
  errorMessage: TransactionsErrorMessages | null;
  transactionAmount: string;
  setTransactionAmount: (value: string) => void;
};

export enum TransactionsErrorMessages {
  INSUFFICIENT_FUND = 'Insufficient funds for gas!',
}

export const useTransaction: UseTransaction = ({account, currencyInstance}) => {
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [estimatedGasPrice, setEstimatedGasPrice] = useState<string | null>(
    null,
  );
  const [errorMessage, setErrorMessage] =
    useState<TransactionsErrorMessages | null>(null);

  const debouncedTransactionAmount = useDebounce(transactionAmount, 500);

  const estimateGasPrice = async (amount: string): Promise<string | null> => {
    try {
      if (account && currencyInstance && parseFloat(amount)) {
        const price = await currencyInstance.estimateGasPrice(
          account.address,
          amount,
        );

        return price;
      }
      return null;
    } catch (error) {
      const message = (error as Error).message;
      console.log('estimateGasPrice#error', message);
      if (message.includes('insufficient funds')) {
        setErrorMessage(TransactionsErrorMessages.INSUFFICIENT_FUND);
      }

      return null;
    }
  };

  const _setTransactionAmount = (value: string) => {
    setErrorMessage(null);
    setTransactionAmount(value);
  };

  useEffect(() => {
    if (currencyInstance) {
      estimateGasPrice(debouncedTransactionAmount).then(setEstimatedGasPrice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTransactionAmount]);

  return {
    errorMessage,
    estimatedGasPrice,
    transactionAmount,
    setTransactionAmount: _setTransactionAmount,
  };
};
