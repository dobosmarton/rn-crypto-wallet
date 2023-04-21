// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'react';
import Web3 from 'web3';
import {POLYGON_ENDPOINT} from '@env';
import {web3LibBuilder} from '../web3';

const Web3Instance = new Web3(
  new Web3.providers.HttpProvider(POLYGON_ENDPOINT),
);

export const polygonLib = web3LibBuilder(Web3Instance);
