import {useEffect, useState} from 'react';
import {Account} from 'web3-core';
import {useLoading} from './useLoading';

type UseBalance = (props: {
  account: Account | null;
  currencyPostfix: string;
  getBalance: (address: string) => Promise<string>;
}) => {
  balance: string | null;
  balanceText: string;
  isLoading: boolean;
};

export const useBalance: UseBalance = ({
  account,
  currencyPostfix,
  getBalance: getCurrencyBalance,
}) => {
  const [balance, setBalance] = useState<string | null>(null);
  const {isLoading, withLoading} = useLoading();

  const getBalance = () =>
    withLoading(async (): Promise<null | string> => {
      if (!account) {
        return null;
      }
      return getCurrencyBalance(account.address);
    });

  useEffect(() => {
    if (!account) {
      setBalance(null);
    } else {
      getBalance().then(setBalance);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return {
    isLoading,
    balance,
    balanceText: `${balance ?? 'NaN'} ${currencyPostfix}`,
  };
};
