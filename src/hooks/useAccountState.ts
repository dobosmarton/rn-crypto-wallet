import {Account} from 'web3-core';
import {useEthereumAccountState} from '../context/ethereum.provider';
import {usePolygonAccountState} from '../context/polygon.provider';
import {CurrencyTypes} from './useConfig';
import {Transaction} from '../libs/scan';

type Slice = {
  account: Account | null;
  balance: string | null;
  history: Transaction[];
  isBalanceLoading: boolean;
  isHistoryLoading: boolean;
  currencyPostfix: string | undefined;
};

type State = {
  [key: string]: Slice;
};

type UseAccountState = () => {
  state: State;
  getStateSlice: (key: CurrencyTypes) => Slice;
  loadWallet: (privateKey: string | null) => void;
  resetAccount: () => void;
  hasAccount: () => boolean;
};

export const useAccountState: UseAccountState = () => {
  const ethState = useEthereumAccountState();
  const polygonState = usePolygonAccountState();

  const state: State = {
    [CurrencyTypes.ethereum]: {
      account: ethState.account,
      balance: ethState.balance,
      history: ethState.history,
      isBalanceLoading: ethState.isBalanceLoading,
      isHistoryLoading: ethState.isHistoryLoading,
      currencyPostfix: ethState.currencyPostfix,
    },
    [CurrencyTypes.polygon]: {
      account: polygonState.account,
      balance: polygonState.balance,
      history: polygonState.history,
      isBalanceLoading: polygonState.isBalanceLoading,
      isHistoryLoading: polygonState.isHistoryLoading,
      currencyPostfix: polygonState.currencyPostfix,
    },
  };

  const getStateSlice = (key: CurrencyTypes): Slice => {
    return state[key];
  };

  const loadWallet = (privateKey: string | null) => {
    if (privateKey) {
      ethState.loadWallet(privateKey);
      polygonState.loadWallet(privateKey);
    }
  };

  const resetAccount = () => {
    ethState.resetAccount();
    polygonState.resetAccount();
  };

  const hasAccount = (): boolean => {
    return Object.keys(state).some(slice => state[slice].account);
  };

  return {
    state,
    getStateSlice,
    loadWallet,
    resetAccount,
    hasAccount,
  };
};
