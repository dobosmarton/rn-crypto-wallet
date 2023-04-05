import {useEffect, useState} from 'react';
import {
  generateWords as _generateWords,
  wordsToSeedHex,
} from '../libs/mnemonics';
import * as secureStore from '../libs/secureStore';

type UseRecoveryWords = () => {
  randomWords: string[];
  generateWords: () => Promise<void>;
  generateSeed: (
    password: string,
    words?: string[],
  ) => Promise<string | undefined>;
};

export const useRecoveryWords: UseRecoveryWords = () => {
  const [randomWords, setRandomWords] = useState<string[]>([]);

  const generateWords = async () => {
    const words = await _generateWords(128);
    setRandomWords(words);
  };

  const generateSeed = async (
    password: string,
    words: string[] = randomWords,
  ): Promise<string | undefined> => {
    try {
      const seedHex = await wordsToSeedHex(words.join(' '), password);
      await secureStore.saveData('private-key', seedHex);

      return seedHex;
    } catch (error) {
      console.log('generateSeed#error', (error as Error).message);
    }
  };

  useEffect(() => {
    // generate words after the mount
    generateWords();
  }, []);

  return {
    randomWords,
    generateWords,
    generateSeed,
  };
};
