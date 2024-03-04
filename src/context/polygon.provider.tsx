import React, {createContext, useContext, PropsWithChildren} from 'react';
import {Account} from 'web3-core';
import {useBalance} from '../hooks/useBalance';
import {CurrencyTypes, useConfig} from '../hooks/useConfig';
import {useTransactionHistory} from '../hooks/useTransactionHistory';
import {useAccount} from '../hooks/useAccount';
import {Transaction} from '../libs/scan';

export interface PolygonAccountContext {
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
export const PolygonAccountState = createContext<CurrencyAccountContext>();

export const usePolygonAccountState = () => useContext(PolygonAccountState);

export type PolygonAccountProviderProps = {};

export const PolygonAccountProvider = ({
  children,
}: PropsWithChildren<PolygonAccountProviderProps>) => {
  const type = CurrencyTypes.polygon;
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

  const state: PolygonAccountContext = {
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
    <PolygonAccountState.Provider value={state}>
      {children}
    </PolygonAccountState.Provider>
  );
};
