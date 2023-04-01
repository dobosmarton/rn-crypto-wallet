import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';

import {Input} from './input';
import {Button} from './button';

type Props = {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
};

export const PasswordSheet: React.FunctionComponent<Props> = ({
  isVisible,
  setVisible,
}) => {
  const insets = useSafeAreaInsets();
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
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setVisible(!isVisible)}>
      <BlurView
        style={styles.blurView}
        blurType="dark"
        blurAmount={3}
        reducedTransparencyFallbackColor="white"
      />

      <TouchableWithoutFeedback onPress={() => setVisible(!isVisible)}>
        <KeyboardAvoidingView
          style={styles.screenContainer}
          keyboardVerticalOffset={-insets.bottom}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={e => {
              e.stopPropagation();
            }}>
            <View
              style={[styles.modalContainer, {paddingBottom: insets.bottom}]}>
              <View style={styles.modalView}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.title}>Set password</Text>
                  <Text style={styles.description}>
                    Set a strong password allowing you to login easily to your
                    wallet from this device. We don't send and store the
                    password anywhere except this device.
                  </Text>
                </View>

                <View style={styles.sectionContainer}>
                  <Input
                    placeholder="Type a strong password"
                    value={password}
                    onChange={setPassword}
                    secureTextEntry
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
                  <Button onPress={onCreateWallet}>Create wallet</Button>
                  <Button type="tertiary" onPress={() => setVisible(false)}>
                    Cancel
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screenContainer: {flex: 1, justifyContent: 'flex-end'},
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
  sectionContainer: {
    gap: 12,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
