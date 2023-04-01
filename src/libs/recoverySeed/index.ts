/**
 * Based on this library
 * https://github.com/valora-inc/react-native-bip39/blob/master/src/index.ts
 */

import {Buffer} from 'buffer';
import {pbkdf2} from 'react-native-fast-crypto';
import {generateSecureRandom} from 'react-native-securerandom';
import {sha256Bytes} from 'react-native-sha256';

import wordList from './words.json';

const bytesToBinary = <T extends number>(bytes: T[]): string => {
  return bytes.reduce<string>(
    (prev, curr) => prev.concat(lpad(curr.toString(2), '0', 8)),
    '',
  );
};

const lpad = (str: string, padString: string, length: number): string => {
  while (str.length < length) {
    str = padString + str;
  }
  return str;
};

const salt = (password: string) =>
  'mnemonic' + (password.normalize('NFKD') || '');

const checksumBits = async (entropyBuffer: Buffer): Promise<string> => {
  const bytes = Array.from(entropyBuffer);

  const hash = await sha256Bytes(bytes);

  // Calculated constants from BIP39
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;

  const res = bytesToBinary([].slice.call(hash));

  return res.slice(0, CS);
};

const wordsToSeed = async (
  mnemonic: string,
  password: string,
): Promise<Buffer> => {
  const mnemonicBuffer = Buffer.from(mnemonic, 'utf8');
  const saltBuffer = Buffer.from(salt(password), 'utf8');
  return pbkdf2.deriveAsync(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512');
};

const entropyToWords = async (
  entropy: string,
  wordlist: string[] = wordList,
): Promise<string[]> => {
  const entropyBuffer = Buffer.from(entropy, 'hex');
  const entropyBits = bytesToBinary([].slice.call(entropyBuffer));

  const checksum = await checksumBits(entropyBuffer);

  const bits = entropyBits + checksum;
  const chunks = bits.match(/(.{1,11})/g);

  const words = (chunks ?? []).map(
    (binary: string) => wordlist[parseInt(binary, 2)],
  );

  return words;
};

export const wordsToSeedHex = async (
  mnemonic: string,
  password: string,
): Promise<string> => {
  const seed = await wordsToSeed(mnemonic, password);
  return seed.toString('hex');
};

const wordsToEntropy = async (
  mnemonic: string,
  wordlist: string[] = wordList,
): Promise<string> => {
  const words = mnemonic.split(' ');

  if (words.length % 3 !== 0) {
    throw new Error('Invalid mnemonic');
  }

  const belongToList = words.every(word => wordlist.indexOf(word) > -1);

  if (!belongToList) {
    throw new Error('Invalid mnemonic');
  }

  // convert word indices to 11 bit binary strings
  const bits = words
    .map(word => {
      const index = wordlist.indexOf(word);
      return lpad(index.toString(2), '0', 11);
    })
    .join('');

  // split the binary string into ENT/CS
  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropy = bits.slice(0, dividerIndex);
  const checksum = bits.slice(dividerIndex);

  // calculate the checksum and compare
  const entropyBytes = (entropy.match(/(.{1,8})/g) as Array<string>).map(bin =>
    parseInt(bin, 2),
  );
  const entropyBuffer = Buffer.from(entropyBytes);
  const newChecksum = await checksumBits(entropyBuffer);

  if (newChecksum !== checksum) {
    throw new Error('Invalid mnemonic checksum');
  }

  return entropyBuffer.toString('hex');
};

export const generateWords = async (
  strength: number = 128,
  wordlist: string[] = wordList,
): Promise<string[]> => {
  const bytes = await generateSecureRandom(strength / 8);
  const hexBuffer = Buffer.from(bytes).toString('hex');

  return entropyToWords(hexBuffer, wordlist);
};

const validateWords = (
  mnemonic: string,
  wordlist: string[] = wordList,
): boolean => {
  try {
    wordsToEntropy(mnemonic, wordlist);
  } catch (e) {
    return false;
  }
  return true;
};
