import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {Header} from '../components/header';
import {Button} from '../components/button';
import {useRecoveryWords} from '../hooks/useRecoveryWords';
import {Chip} from '../components/chip';
import {RootStackParamList} from '../navigation';
import {useLoading} from '../hooks/useLoading';
import {CreatePasswordSheet} from '../components/actionSheets/createPasswordSheet';
import {generatePrivateKey} from '../libs/hdkey';
import {useAccountState} from '../hooks/useAccountState';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateWallet'>;
};

export const CreateWalletScreen: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const {isLoading, withLoading} = useLoading();

  const {loadWallet} = useAccountState();
  const {randomWords, generateWords, generateSeed} = useRecoveryWords();

  const onContinue = () => {
    setPasswordModalOpen(true);
  };

  const onCreateWallet = (password: string) =>
    withLoading(async () => {
      try {
        const seed = await generateSeed(password);

        if (seed !== undefined) {
          const key = await generatePrivateKey(seed);

          setPasswordModalOpen(false);
          loadWallet(key);
        }
      } catch (error) {
        console.log('onCreateWallet#error', (error as Error).message);
      }
    });

  return (
    <SafeArea>
      <Header
        title="Create Wallet"
        type="tertiary"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}>
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

      <CreatePasswordSheet
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
