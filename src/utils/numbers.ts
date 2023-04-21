import Web3 from 'web3';

export const convertStringToNumSafely = (value: string): number => {
  const priceAsBigNumber = Web3.utils.toBN(value);

  const MAX_NUMBER_IN_JS = Number.MAX_SAFE_INTEGER;

  const maxNumberInJsAsBigNumber = Web3.utils.toBN(MAX_NUMBER_IN_JS);

  //compare to make sure that your big number can be convert to number (the max number in js is greate or equal to your bignumber )
  const isSafeToConvert = maxNumberInJsAsBigNumber.gte(priceAsBigNumber);

  if (!isSafeToConvert) {
    throw new Error('The string can not be converted to number!');
  }

  return priceAsBigNumber.toNumber();
};
