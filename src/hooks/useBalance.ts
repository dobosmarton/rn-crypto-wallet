import {useEffect, useState} from 'react';
import {useLoading} from './useLoading';
import {CurrencyTypes, useConfig} from './useConfig';

type UseBalance = (
  address: string | undefined,
  type: CurrencyTypes,
) => {
  balance: string | null;
  balanceText: string;
  isLoading: boolean;
};

export const useBalance: UseBalance = (address, type) => {
  const [balance, setBalance] = useState<string | null>(null);
  const {isLoading, withLoading} = useLoading();
  const {lib, currencyPostfix} = useConfig(type);

  const getBalance = () =>
    withLoading(async (): Promise<null | string> => {
      if (!address || !lib) {
        return null;
      }
      return lib.getBalance(address);
    });

  useEffect(() => {
    if (!address) {
      setBalance(null);
    } else {
      getBalance().then(setBalance);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return {
    isLoading,
    balance,
    balanceText: `${balance ?? 'NaN'} ${currencyPostfix}`,
  };
};
