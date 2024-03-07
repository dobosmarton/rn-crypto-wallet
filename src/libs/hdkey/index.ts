import {sha512} from 'js-sha512';
import {Buffer} from 'buffer';
import {deriveHdPrivateNodeFromSeed} from '@bitauth/libauth';
import * as secureStore from '../secureStore';

export const generatePrivateKey = async (seed: string) => {
  const res = deriveHdPrivateNodeFromSeed(
    Buffer.from(seed, 'utf8'),
    undefined,
    {
      sha512: {
        hash: input => new Uint8Array(sha512.arrayBuffer(input)),
      },
    },
  );
  if (res.valid) {
    const privateKey = Buffer.from(res.privateKey).toString('hex');
    await secureStore.saveData('private-key', privateKey);
    return privateKey;
  }

  return null;
};
