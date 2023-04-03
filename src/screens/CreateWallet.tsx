import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {Header} from '../components/header';
import {Button} from '../components/button';
import {useRecoveryWords} from '../hooks/useRecoveryWords';
import {Chip} from '../components/chip';
import {PasswordSheet} from '../components/passwordSheet';
import {useAccountState} from '../context/account.provider';
import {RootStackParamList} from '../libs/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateWallet'>;
};

export const CreateWalletScreen: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {loadWallet} = useAccountState();
  const {randomWords, generateWords, generateSeed} = useRecoveryWords();

  const onContinue = () => {
    setPasswordModalOpen(true);
  };

  const onCreateWallet = async (password: string) => {
    try {
      setLoading(true);
      const key = await generateSeed(password);

      if (key !== undefined) {
        setPasswordModalOpen(false);
        loadWallet(key);
      }

      setLoading(false);
    } catch (error) {
      console.log('onCreateWallet#error', (error as Error).message);
      setLoading(false);
    }
  };

  return (
    <SafeArea>
      <Header
        title="Create Wallet"
        type="secondary"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>Recovery seed</Text>
        <Text style={styles.description}>
          Write down your 12-word phrase in the correct order without any
          spelling mistakes! The words need to be in the correct order to
          restore your funds. Entering the secret phrase incorrectly (wrong
          order or incorrect spelling) will result in you not being able to
          access your wallet.
        </Text>

        <View style={styles.wordContainer}>
          {randomWords.map((word, index) => (
            <Chip key={word + index}>{word}</Chip>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button type="secondary" onPress={generateWords}>
            Regenerate
          </Button>
          <Button onPress={onContinue}>Continue</Button>
        </View>
      </ScrollView>

      <PasswordSheet
        isVisible={isPasswordModalOpen}
        isWalletLoading={isLoading}
        setVisible={setPasswordModalOpen}
        onContinue={onCreateWallet}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#474E68',
  },

  wordContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    gap: 12,
  },
});
