import Web3 from 'web3';
import {Account} from 'web3-core';
import {convertStringToNumSafely} from '../../utils/numbers';

export type CurrencyInstance = {
  privateKeyToAccount: (privateKey: string) => Account;
  getBalance: (address: string) => Promise<string>;
  estimateGasPrice: (address: string, amount: string) => Promise<string | null>;
};

export const currencyBuilder = (web3Instance: Web3): CurrencyInstance => {
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

  return {
    privateKeyToAccount,
    getBalance,
    estimateGasPrice,
  };
};
