import {useEffect, useState} from 'react';
import {
  generateWords as _generateWords,
  wordsToSeedHex,
} from '../libs/recoverySeed';

type UseRecoveryWords = () => {
  salt: string;
  setSalt: React.Dispatch<React.SetStateAction<string>>;
  randomWords: string[];
  generateWords: () => Promise<void>;
  generateSeed: () => Promise<void>;
};

export const useRecoveryWords: UseRecoveryWords = () => {
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [salt, setSalt] = useState<string>('');

  const generateWords = async () => {
    const words = await _generateWords(128);

    setRandomWords(words);
  };

  const generateSeed = async () => {
    const seedHex = await wordsToSeedHex(randomWords.join(' '), salt);
  };

  useEffect(() => {
    // generate words after the mount
    generateWords();
  }, []);

  return {
    salt,
    setSalt: setSalt,
    randomWords,
    generateWords,
    generateSeed,
  };
};
