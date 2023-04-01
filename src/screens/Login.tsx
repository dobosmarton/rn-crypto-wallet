import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from '../components/button';
import {SafeArea} from '../components/safeArea';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen: React.FunctionComponent<Props> = ({navigation}) => {
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.buttonContainer}>
          <Button onPress={() => {}}>Login</Button>
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
