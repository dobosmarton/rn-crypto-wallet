import React, {createContext, useContext, PropsWithChildren} from 'react';
import {Account} from 'web3-core';
import {useBalance} from '../hooks/useBalance';
import {useTransactionHistory} from '../hooks/useTransactionHistory';
import {CurrencyTypes, useConfig} from '../hooks/useConfig';
import {useAccount} from '../hooks/useAccount';
import {Transaction} from '../libs/scan';

export interface EthereumAccountContext {
  account: Account | null;
  balance: string | null;
  isBalanceLoading: boolean;
  history: Transaction[];
  isHistoryLoading: boolean;
  currencyPostfix: string | undefined;
  loadWallet: (privateKey: string | null) => void;
  resetAccount: () => void;
}

// Ignoring missing initialValue, because there's always a provider and value is provided
//
// @ts-ignore - value is provided in index.tsx
export const EthereumAccountState = createContext<CurrencyAccountContext>();

export const useEthereumAccountState = () => useContext(EthereumAccountState);

export type EthereumAccountProviderProps = {
  //
};

export const EthereumAccountProvider = ({
  children,
}: PropsWithChildren<EthereumAccountProviderProps>) => {
  const type = CurrencyTypes.ethereum;
  const {account, loadWallet, resetAccount} = useAccount(type);
  const {currencyPostfix} = useConfig(type);

  const {balance, isLoading: isBalanceLoading} = useBalance(
    account?.address,
    type,
  );

  const {history, isLoading: isHistoryLoading} = useTransactionHistory(
    account?.address,
    type,
  );

  const state: EthereumAccountContext = {
    account,
    balance,
    isBalanceLoading,
    history,
    isHistoryLoading,
    currencyPostfix,
    loadWallet,
    resetAccount,
  };

  return (
    <EthereumAccountState.Provider value={state}>
      {children}
    </EthereumAccountState.Provider>
  );
};
