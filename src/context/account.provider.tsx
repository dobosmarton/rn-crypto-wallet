import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from 'react';
import {Account} from 'web3-core';
import * as ethLib from '../libs/ethereum';
import * as secureStore from '../libs/secureStore';
import {useBalance} from '../hooks/useBalance';

export interface AccountContext {
  account: Account | null;
  balance: string | null;
  isBalanceLoading: boolean;
  loadWallet: (privateKey: string) => void;
  signOut: () => Promise<boolean>;
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
  const {balance, isLoading: isBalanceLoading} = useBalance({account});

  const loadWallet = (privateKey: string) => {
    const _account = ethLib.privateKeyToAccount(privateKey);

    setAccount(_account);
  };

  const signOut = async () => {
    setAccount(null);
    return secureStore.resetData();
  };

  const state: AccountContext = {
    account,
    balance,
    isBalanceLoading,
    loadWallet,
    signOut,
  };

  return (
    <AccountState.Provider value={state}>{children}</AccountState.Provider>
  );
};
