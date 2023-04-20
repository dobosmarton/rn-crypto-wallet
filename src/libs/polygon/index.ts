// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'react';
import Web3 from 'web3';
import {Account} from 'web3-core';
import {POLYGON_ENDPOINT} from '@env';

const Web3Instance = new Web3(
  new Web3.providers.HttpProvider(POLYGON_ENDPOINT),
);

export const privateKeyToAccount = (privateKey: string): Account =>
  Web3Instance.eth.accounts.privateKeyToAccount(privateKey, true);

export const getBalance = async (address: string): Promise<string> => {
  const balance = await Web3Instance.eth.getBalance(address);
  return Web3Instance.utils.fromWei(balance, 'ether');
};
