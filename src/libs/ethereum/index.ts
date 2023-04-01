// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'react';
import Web3 from 'web3';
import {Account} from 'web3-core';
import {ETHEREUM_ENDPOINT} from '@env';

const getWeb3Instance = (): Web3 => {
  return new Web3(new Web3.providers.HttpProvider(ETHEREUM_ENDPOINT));
};

export const privateKeyToAccount = (privateKey: string): Account => {
  return getWeb3Instance().eth.accounts.privateKeyToAccount(privateKey, true);
};

export const getBalance = async (address: string): Promise<string> => {
  const web3 = getWeb3Instance();
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
};
