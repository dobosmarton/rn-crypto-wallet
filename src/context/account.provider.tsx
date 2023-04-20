import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from 'react';
import {Account} from 'web3-core';
import * as ethLib from '../libs/ethereum';
import * as polygonLib from '../libs/polygon';
import * as secureStore from '../libs/secureStore';
import {useBalance} from '../hooks/useBalance';

type ExtendedAccount = Account & {
  balance: string | null;
  balanceText: string;
  isLoading: boolean;
};

export interface AccountContext {
  account: Account | null;
  accounts: {[key: string]: ExtendedAccount};
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
  const [ethAccount, setEthAccount] = useState<Account | null>(null);
  const [polygonAccount, setPolygonAccount] = useState<Account | null>(null);
  const ethBalance = useBalance({
    account: ethAccount,
    currencyPostfix: 'ETH',
    getBalance: ethLib.getBalance,
  });
  const polygonBalance = useBalance({
    account: polygonAccount,
    currencyPostfix: 'MATIC',
    getBalance: polygonLib.getBalance,
  });

  const loadWallet = (privateKey: string) => {
    setEthAccount(ethLib.privateKeyToAccount(privateKey));
    setPolygonAccount(polygonLib.privateKeyToAccount(privateKey));
  };

  const signOut = async () => {
    setEthAccount(null);
    setPolygonAccount(null);
    return secureStore.resetData();
  };

  const getAccounts = () => {
    const accounts: {[key: string]: ExtendedAccount} = {};
    if (ethAccount) {
      accounts.ethereum = {...ethAccount, ...ethBalance};
    }
    if (polygonAccount) {
      accounts.polygon = {...polygonAccount, ...polygonBalance};
    }
    return accounts;
  };

  const state: AccountContext = {
    account: ethAccount,
    balance: ethBalance.balance,
    isBalanceLoading: ethBalance.isLoading,
    accounts: getAccounts(),
    loadWallet,
    signOut,
  };

  return (
    <AccountState.Provider value={state}>{children}</AccountState.Provider>
  );
};
