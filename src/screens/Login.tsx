import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Button} from '../components/button';
import {SafeArea} from '../components/safeArea';
import * as secureStore from '../libs/secureStore';
import {useAccountState} from '../context/account.provider';
import {RootStackParamList} from '../libs/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen: React.FunctionComponent<Props> = ({navigation}) => {
  const {loadWallet} = useAccountState();

  const onLogin = async () => {
    try {
      const walletKey = await secureStore.loadData();
      console.log('walletKey', walletKey);

      if (walletKey) {
        loadWallet(walletKey.password);
      } else {
        // recover your wallet based on the mnemonics
        // or create a new one
      }
    } catch (error) {
      console.log('onLogin#error', (error as Error).message);
    }
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.buttonContainer}>
          <Button onPress={onLogin}>Login</Button>
          <Button
            type="tertiary"
            onPress={() => navigation.navigate('CreateWallet')}>
            Create Wallet
          </Button>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    gap: 12,
  },
});
