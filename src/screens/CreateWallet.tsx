import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {Header} from '../components/header';
import {RootStackParamList} from '../App';
import {Button} from '../components/button';
import {useRecoveryWords} from '../hooks/useRecoveryWords';
import {Chip} from '../components/chip';
import {Input} from '../components/input';
import {PasswordSheet} from '../components/passwordSheet';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateWallet'>;
};

export const CreateWalletScreen: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const {randomWords, salt, setSalt, generateWords} = useRecoveryWords();

  const onContinue = () => {
    setPasswordModalOpen(true);
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={styles.screenContainer}
        keyboardVerticalOffset={24}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <Header title="Create Wallet" onBack={() => navigation.goBack()} />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.container}>
          <Text style={styles.title}>1. Recovery seed</Text>
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

          <Text style={styles.description}>
            You can add extra characters, allowing you to produce completely
            different seeds from the same generated words. Don't forget to write
            it down along with the generated words.
          </Text>

          <Input
            placeholder="Type something for extra safety"
            value={salt}
            onChange={setSalt}
          />

          <View style={styles.buttonContainer}>
            <Button type="secondary" onPress={generateWords}>
              Regenerate
            </Button>
            <Button onPress={onContinue}>Continue</Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <PasswordSheet
        isVisible={isPasswordModalOpen}
        setVisible={setPasswordModalOpen}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  screenContainer: {flex: 1, flexDirection: 'row'},
  scrollContainer: {flex: 1},
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
