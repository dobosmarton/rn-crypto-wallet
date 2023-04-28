import ky from 'ky';
import {MutationFetcher} from 'swr/mutation';

export type Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
};

type TransactionResult = {
  status: string;
  message: string;
  result: Transaction[];
};

type Config = {
  apiKey: string | undefined;
};

interface Data {
  address: string;
  page: number;
  offset: number;
  endblock: number;
  config: Config;
}

export const getTransactions: MutationFetcher<Transaction[], Data> = async (
  url: string,
  {arg}: {arg: Data},
) => {
  if (!arg.config.apiKey) {
    throw new Error('Polygonscan env variables are not defined!');
  }

  const res = await ky.get(url, {
    searchParams: {
      module: 'account',
      action: 'txlist',
      address: arg.address,
      startblock: 0,
      endblock: arg.endblock,
      page: arg.page,
      offset: arg.offset,
      sort: 'desc',
      apikey: arg.config.apiKey,
    },
  });

  const jsonRes = await res.json<TransactionResult>();
  if (jsonRes.status === '0') {
    return [];
  }
  return jsonRes.result;
};
