import Web3 from 'web3';
import {Account, TransactionConfig, TransactionReceipt} from 'web3-core';
import {convertStringToNumSafely} from '../../utils/numbers';

type TransactionProps = {
  addressFrom: string;
  addressTo: string;
  amount: string;
  privateKey: string;
};

export type Web3Instance = {
  isValidAddress: (address: string) => boolean;
  privateKeyToAccount: (privateKey: string) => Account;
  getBalance: (address: string) => Promise<string>;
  estimateGasPrice: (address: string, amount: string) => Promise<string | null>;
  sendTransaction: (
    props: TransactionProps,
  ) => Promise<TransactionReceipt | null>;
};

export const web3LibBuilder = (web3Instance: Web3): Web3Instance => {
  const privateKeyToAccount = (privateKey: string): Account =>
    web3Instance.eth.accounts.privateKeyToAccount(privateKey, true);

  const getBalance = async (address: string): Promise<string> => {
    const balance = await web3Instance.eth.getBalance(address);
    return web3Instance.utils.fromWei(balance, 'ether');
  };

  const estimateGasPrice = async (
    address: string,
    amount: string,
  ): Promise<string> => {
    const gasPriceText = await web3Instance.eth.getGasPrice();
    const gasPrice = convertStringToNumSafely(gasPriceText);
    const amountValue = web3Instance.utils.toWei(amount, 'ether');
    const estimatedGas = await web3Instance.eth.estimateGas({
      from: address,
      value: amountValue,
    });

    return web3Instance.utils.fromWei(String(gasPrice * estimatedGas), 'ether');
  };

  const isValidAddress = (address: string) =>
    web3Instance.utils.isAddress(address);

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

    const rawTransaction: TransactionConfig = {
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

    if (!signedTransaction) {
      throw new Error('Transaction signature failed!');
    }

    return web3Instance.eth.sendSignedTransaction(
      signedTransaction.rawTransaction as string,
    );
  };

  return {
    isValidAddress,
    privateKeyToAccount,
    getBalance,
    estimateGasPrice,
    sendTransaction,
  };
};
