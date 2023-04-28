import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';
import {Transaction, getTransactions} from '../libs/scan';
import {CurrencyTypes, useConfig} from './useConfig';

export type UseTransactionHistory = (
  address: string | undefined,
  type: CurrencyTypes,
) => {
  isLoading: boolean;
  history: Transaction[];
  error: unknown;
  loadTransactions: (
    address: string,
    page: number,
    offset: number,
  ) => Promise<Transaction[] | undefined>;
};

export const useTransactionHistory: UseTransactionHistory = (address, type) => {
  const {scanUrl, scanApiKey, lib} = useConfig(type);

  const {
    data: transactionHistory,
    trigger,
    isMutating,
    error,
  } = useSWRMutation(scanUrl, getTransactions);

  const loadTransactions = async (_address: string, page = 1, offset = 10) => {
    if (!lib) {
      throw new Error('Lib is not defined!');
    }
    const endblock = await lib.getLatestBlock();
    return trigger({
      address: _address,
      page,
      offset,
      endblock: endblock.number,
      config: {apiKey: scanApiKey},
    });
  };

  useEffect(() => {
    if (address) {
      loadTransactions(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, address]);

  return {
    isLoading: isMutating,
    history: transactionHistory ?? [],
    loadTransactions,
    error,
  };
};
