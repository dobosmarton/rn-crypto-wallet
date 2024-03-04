import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Input} from '../input';
import {Button} from '../button';
import {ActionSheet} from './actionSheet';

type Props = {
  isVisible: boolean;
  isWalletLoading: boolean;
  setVisible: (isVisible: boolean) => void;
  onContinue: (password: string) => Promise<void>;
};

export const CreatePasswordSheet: React.FunctionComponent<Props> = ({
  isVisible,
  isWalletLoading,
  setVisible,
  onContinue,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [password, confirmPassword]);

  const onCreateWallet = () => {
    if (password !== confirmPassword) {
      setErrorMessage("The entered passwords don't match!");
      return;
    }
    onContinue(password);
  };

  return (
    <ActionSheet isVisible={isVisible} setVisible={setVisible}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Set password</Text>
        <Text style={styles.description}>
          Set a strong password allowing you to login easily to your wallet from
          this device. We don't send and store the password anywhere except this
          device.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Input
          placeholder="Type a strong password"
          value={password}
          onChange={setPassword}
          secureTextEntry
          autoFocus
        />
        <Input
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Type the password again"
          errorMessage={errorMessage}
          secureTextEntry
        />
      </View>
      <View style={styles.sectionContainer}>
        <Button onPress={onCreateWallet} isLoading={isWalletLoading}>
          Create wallet
        </Button>
        <Button type="tertiary" onPress={() => setVisible(false)}>
          Cancel
        </Button>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#474E68',
  },
});
