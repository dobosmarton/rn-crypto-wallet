import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import {Account} from 'web3-core';
import * as ethLib from '../libs/ethereum';

export interface AccountContext {
  account: Account | null;
  balance: string | null;
  loadWallet: (privateKey: string) => void;
  signOut: () => void;
}

// Ignoring missing initialValue, because there's always a provider and value is provided
//
// @ts-ignore - value is provided in index.tsx
export const AccountState = createContext<AccountContext>();

export const useAccountState = () => useContext(AccountState);

export type AccountProviderProps = {
  //
};

export const AccountProvider = ({
  children,
}: PropsWithChildren<AccountProviderProps>) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const loadWallet = (privateKey: string) => {
    const _account = ethLib.privateKeyToAccount(privateKey);

    setAccount(_account);
  };

  const getBalance = async (): Promise<null | string> => {
    if (!account) {
      return null;
    }
    return ethLib.getBalance(account.address);
  };

  const signOut = async () => {
    setAccount(null);
  };

  useEffect(() => {
    if (!account) {
      setBalance(null);
    } else {
      getBalance().then(setBalance);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const state: AccountContext = {
    account,
    balance,
    loadWallet,
    signOut,
  };

  return (
    <AccountState.Provider value={state}>{children}</AccountState.Provider>
  );
};
