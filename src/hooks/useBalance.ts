import {useEffect, useState} from 'react';
import {Account} from 'web3-core';
import * as ethLib from '../libs/ethereum';
import {useLoading} from './useLoading';

type UseBalance = (props: {account: Account | null}) => {
  balance: string | null;
  isLoading: boolean;
};

export const useBalance: UseBalance = ({account}) => {
  const [balance, setBalance] = useState<string | null>(null);
  const {isLoading, withLoading} = useLoading();

  const getBalance = () =>
    withLoading(async (): Promise<null | string> => {
      if (!account) {
        return null;
      }
      return ethLib.getBalance(account.address);
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
  };
};
