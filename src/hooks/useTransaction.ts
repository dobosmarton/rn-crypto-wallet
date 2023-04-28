import {Account, TransactionReceipt} from 'web3-core';
import {Web3Instance} from '../libs/web3';
import {useEffect, useState} from 'react';
import {useDebounce} from './useDebounce';
import {useLoading} from './useLoading';

type UseTransaction = (props: {
  account: Account | null;
  web3Instance?: Web3Instance;
}) => {
  isLoading: boolean;
  estimatedGasPrice: string | null;
  errorMessage: TransactionsErrorMessages | null;
  addressErrorMessage: TransactionsErrorMessages | null;
  transactionAmount: string;
  setTransactionAmount: (value: string) => void;
  transactionToAddress: string;
  setTransactionToAddress: (value: string) => void;
  sendTransaction: () => Promise<TransactionReceipt | null>;
};

export enum TransactionsErrorMessages {
  INSUFFICIENT_FUND = 'Insufficient funds for gas!',
  INVALID_RECEIVER_ADDRESS = 'The entered address is not a valid address!',
}

export const useTransaction: UseTransaction = ({account, web3Instance}) => {
  const {isLoading, withLoading} = useLoading();
  const [transactionToAddress, setTransactionToAddress] = useState<string>('');
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [estimatedGasPrice, setEstimatedGasPrice] = useState<string | null>(
    null,
  );
  const [errorMessage, setErrorMessage] =
    useState<TransactionsErrorMessages | null>(null);

  const debouncedTransactionAmount = useDebounce(transactionAmount, 500);
  const debouncedTransactionToAddress = useDebounce(transactionToAddress, 500);

  const estimateGasPrice = (amount: string): Promise<string | null> =>
    withLoading(async () => {
      try {
        if (account && web3Instance && parseFloat(amount)) {
          const price = await web3Instance.estimateGasPrice(
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
    });

  const _setTransactionAmount = (value: string) => {
    setErrorMessage(null);
    setTransactionAmount(value);
  };

  const getAddressErrorMessage = () =>
    !web3Instance ||
    !debouncedTransactionToAddress ||
    web3Instance.isValidAddress(debouncedTransactionToAddress)
      ? null
      : TransactionsErrorMessages.INVALID_RECEIVER_ADDRESS;

  const sendTransaction = () =>
    withLoading(async () => {
      try {
        if (!web3Instance || !account) {
          throw new Error(
            'Internal error, the transaction cannot be fulfilled!',
          );
        }
        const res = await web3Instance?.sendTransaction({
          addressFrom: account.address,
          addressTo: debouncedTransactionToAddress,
          amount: debouncedTransactionAmount,
          privateKey: account.privateKey,
        });

        return res;
      } catch (error) {
        console.log('sendTransaction#error', (error as Error).message);

        return null;
      }
    });

  useEffect(() => {
    if (web3Instance) {
      estimateGasPrice(debouncedTransactionAmount).then(setEstimatedGasPrice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTransactionAmount]);

  return {
    isLoading,
    errorMessage,
    addressErrorMessage: getAddressErrorMessage(),
    estimatedGasPrice,
    transactionAmount,
    setTransactionAmount: _setTransactionAmount,
    transactionToAddress,
    setTransactionToAddress,
    sendTransaction,
  };
};
