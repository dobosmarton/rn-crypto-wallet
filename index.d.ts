declare module 'react-native-fast-crypto' {
  type pbkdf2Type = {
    deriveAsync: (
      data: Uint8Array,
      salt: Uint8Array,
      iterations: number,
      size: number,
      alg: string,
    ) => Promise<Buffer>;
  };

  export const pbkdf2: pbkdf2Type = {};
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '@env' {
  export const ETHEREUM_ENDPOINT: string;
  export const POLYGON_ENDPOINT: string;

  // other ones
}
