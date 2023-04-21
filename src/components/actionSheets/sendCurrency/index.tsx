import React, {useEffect, useState} from 'react';

import {ActionSheet} from '../actionSheet';

import {
  CurrencyKeys,
  ExtendedAccount,
  useAccountState,
} from '../../../context/account.provider';
import {useTransaction} from '../../../hooks/useTransaction';
import {Edit} from './edit';
import {Review} from './review';

type Props = {
  currencyName: string;
  currencyKey: CurrencyKeys | null;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
};

export const SendCurrencySheet: React.FunctionComponent<Props> = ({
  currencyName,
  currencyKey,
  isVisible,
  setVisible,
}) => {
  const {accounts, account} = useAccountState();
  const [isReviewStep, setReviewStep] = useState(false);

  const {
    isLoading,
    errorMessage,
    estimatedGasPrice,
    transactionAmount,
    setTransactionAmount,
    transactionToAddress,
    addressErrorMessage,
    setTransactionToAddress,
    sendTransaction,
  } = useTransaction({
    account,
    web3Instance:
      currencyKey && accounts[currencyKey]
        ? (accounts[currencyKey] as ExtendedAccount).instance
        : null,
  });

  const onReview = () => {
    if (
      transactionToAddress &&
      transactionAmount &&
      !errorMessage &&
      !addressErrorMessage
    ) {
      setReviewStep(true);
    }
  };

  const onSendTransaction = async () => {
    await sendTransaction();
    setVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      // cleanup
      setTransactionAmount('');
      setTransactionToAddress('');
      setReviewStep(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (!account) {
    return null;
  }

  return (
    <ActionSheet isVisible={isVisible} setVisible={setVisible}>
      {!isReviewStep ? (
        <Edit
          isLoading={isLoading}
          currencyName={currencyName}
          errorMessage={errorMessage}
          estimatedGasPrice={estimatedGasPrice}
          transactionAmount={transactionAmount}
          addressErrorMessage={addressErrorMessage}
          setTransactionAmount={setTransactionAmount}
          transactionToAddress={transactionToAddress}
          setTransactionToAddress={setTransactionToAddress}
          setVisible={setVisible}
          onContinue={onReview}
        />
      ) : (
        <Review
          isLoading={isLoading}
          currencyName={currencyName}
          transactionFromAddress={account.address}
          estimatedGasPrice={estimatedGasPrice}
          transactionToAddress={transactionToAddress}
          transactionAmount={transactionAmount}
          setVisible={setVisible}
          onContinue={onSendTransaction}
          onBack={() => setReviewStep(false)}
        />
      )}
    </ActionSheet>
  );
};
