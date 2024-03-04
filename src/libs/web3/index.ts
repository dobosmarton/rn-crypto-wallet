import Web3, {
  Block,
  BlockNumberOrTag,
  Transaction,
  TransactionReceipt,
} from 'web3';
import {Web3Account} from 'web3-eth-accounts';
import {isAddress} from 'web3-validator';

type TransactionProps = {
  addressFrom: string;
  addressTo: string;
  amount: string;
  privateKey: string;
};

export type Web3Instance = {
  isValidAddress: (address: string) => boolean;
  privateKeyToAccount: (privateKey: string) => Web3Account;
  getBalance: (address: string) => Promise<string>;
  getLatestBlock: () => Promise<Block>;
  getBlock: (blockHashOrBlockNumber: BlockNumberOrTag) => Promise<Block>;
  getTransaction: (hash: string) => Promise<Transaction>;
  getTransactionCount: (address: string) => Promise<bigint>;
  estimateGasPrice: (address: string, amount: string) => Promise<string | null>;
  sendTransaction: (
    props: TransactionProps,
  ) => Promise<TransactionReceipt | null>;
};

export const web3LibBuilder = (web3Instance: Web3): Web3Instance => {
  const privateKeyToAccount = (privateKey: string): Web3Account =>
    web3Instance.eth.accounts.privateKeyToAccount(privateKey);

  const getBalance = async (address: string): Promise<string> => {
    const balance = await web3Instance.eth.getBalance(address);
    return web3Instance.utils.fromWei(balance, 'ether');
  };

  const estimateGasPrice = async (
    address: string,
    amount: string,
  ): Promise<string> => {
    const gasPrice = await web3Instance.eth.getGasPrice();
    const amountValue = web3Instance.utils.toWei(amount, 'ether');
    const estimatedGas = await web3Instance.eth.estimateGas({
      from: address,
      value: amountValue,
    });

    return web3Instance.utils.fromWei(String(gasPrice * estimatedGas), 'ether');
  };

  const isValidAddress = (address: string) => isAddress(address);

  const getLatestBlock = () => web3Instance.eth.getBlock('latest', true);

  const getBlock = (blockHashOrBlockNumber: BlockNumberOrTag) =>
    web3Instance.eth.getBlock(blockHashOrBlockNumber, true);

  const getTransactionCount = (address: string) =>
    web3Instance.eth.getTransactionCount(address);

  const getTransaction = (transactionHash: string) =>
    web3Instance.eth.getTransaction(transactionHash);

  const sendTransaction = async (
    props: TransactionProps,
  ): Promise<TransactionReceipt | null> => {
    const nonce = await web3Instance.eth.getTransactionCount(
      props.addressFrom,
      'latest',
    );
    const valueToWei = web3Instance.utils.toWei(props.amount, 'ether');

    const gasPrice = await web3Instance.eth.getGasPrice();

    const estimatedGas = await web3Instance.eth.estimateGas({
      from: props.addressFrom,
      value: valueToWei,
    });

    const rawTransaction: Transaction = {
      from: props.addressFrom,
      to: props.addressTo,
      value: valueToWei,
      nonce,
      gasPrice,
      gas: estimatedGas,
    };

    const signedTransaction = await web3Instance.eth.accounts.signTransaction(
      rawTransaction,
      props.privateKey,
    );

    if (!signedTransaction.rawTransaction) {
      throw new Error('Transaction signature failed!');
    }

    return web3Instance.eth.sendSignedTransaction(
      signedTransaction.rawTransaction,
    );
  };

  return {
    isValidAddress,
    privateKeyToAccount,
    getBalance,
    estimateGasPrice,
    getTransactionCount,
    getTransaction,
    sendTransaction,
    getLatestBlock,
    getBlock,
  };
};
