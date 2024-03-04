// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'react';
import Web3 from 'web3';
import {ETHEREUM_ENDPOINT} from '@env';
import {web3LibBuilder} from '../web3';

const Web3Instance = new Web3(
  new Web3.providers.HttpProvider(ETHEREUM_ENDPOINT),
);

export const ethLib = web3LibBuilder(Web3Instance);
