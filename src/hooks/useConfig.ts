import {
  ETHEREUM_ENDPOINT,
  ETHEREUM_SCAN_BASE_API,
  ETHEREUM_SCAN_KEY,
  POLYGON_ENDPOINT,
  POLYGON_SCAN_BASE_API,
  POLYGON_SCAN_KEY,
} from '@env';
import {ethLib} from '../libs/ethereum';
import {polygonLib} from '../libs/polygon';
import {Web3Instance} from '../libs/web3';

export enum CurrencyTypes {
  ethereum = 'ethereum',
  polygon = 'polygon',
}

export interface Config {
  scanApiKey: string | undefined;
  scanUrl: string | undefined;
  apiUrl: string | undefined;
  lib: Web3Instance | undefined;
  currencyPostfix: string | undefined;
}

type UseConfig = (type: CurrencyTypes | null) => Config;

export const useConfig: UseConfig = type => {
  const getApiKey = () => {
    switch (type) {
      case CurrencyTypes.ethereum:
        return ETHEREUM_SCAN_KEY;
      case CurrencyTypes.polygon:
        return POLYGON_SCAN_KEY;
    }
  };

  const getScanUrl = () => {
    switch (type) {
      case CurrencyTypes.ethereum:
        return ETHEREUM_SCAN_BASE_API;
      case CurrencyTypes.polygon:
        return POLYGON_SCAN_BASE_API;
    }
  };

  const getApiUrl = () => {
    switch (type) {
      case CurrencyTypes.ethereum:
        return ETHEREUM_ENDPOINT;
      case CurrencyTypes.polygon:
        return POLYGON_ENDPOINT;
    }
  };

  const getLib = () => {
    switch (type) {
      case CurrencyTypes.ethereum:
        return ethLib;
      case CurrencyTypes.polygon:
        return polygonLib;
    }
  };

  const getCurrencyPostfix = () => {
    switch (type) {
      case CurrencyTypes.ethereum:
        return 'ETH';
      case CurrencyTypes.polygon:
        return 'MATIC';
    }
  };

  return {
    scanApiKey: getApiKey(),
    scanUrl: getScanUrl(),
    apiUrl: getApiUrl(),
    lib: getLib(),
    currencyPostfix: getCurrencyPostfix(),
  };
};
