import {useState} from 'react';
import {Account} from 'web3-core';
import {CurrencyTypes, useConfig} from './useConfig';

export type UseAccount = (type: CurrencyTypes) => {
  account: Account | null;
  loadWallet: (privateKey: string | null) => void;
  resetAccount: () => void;
};

export const useAccount: UseAccount = type => {
  const {lib} = useConfig(type);
  const [account, setAccount] = useState<Account | null>(null);

  const loadWallet = (privateKey: string | null) => {
    if (privateKey && lib) {
      setAccount(lib.privateKeyToAccount(privateKey));
    }
  };

  const resetAccount = () => {
    setAccount(null);
  };

  return {
    account,
    loadWallet,
    resetAccount,
  };
};
