import {useEffect, useState} from 'react';

import * as mnemonic from '../libs/mnemonics';

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
    const words = await mnemonic.generateWords(128);
    setRandomWords(words);
  };

  const generateSeed = async (
    password: string,
    words: string[] = randomWords,
  ): Promise<string | undefined> =>
    mnemonic.wordsToSeedHex(words.join(' '), password);

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
