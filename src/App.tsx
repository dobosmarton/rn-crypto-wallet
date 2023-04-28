import React from 'react';

// web3js is not entirely compatible with RN
import './utils/base64';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {PolygonAccountProvider} from './context/polygon.provider';
import {EthereumAccountProvider} from './context/ethereum.provider';
import {NavigationRoot} from './navigation';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <EthereumAccountProvider>
        <PolygonAccountProvider>
          <NavigationRoot />
        </PolygonAccountProvider>
      </EthereumAccountProvider>
    </SafeAreaProvider>
  );
}

export default App;
