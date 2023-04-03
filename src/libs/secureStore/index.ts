import * as Keychain from 'react-native-keychain';

export const saveData = async (
  username: string,
  password: string,
): Promise<false | Keychain.Result> => {
  return Keychain.setGenericPassword(username, password, {
    accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    service: 'wallet',
  });
};

export const loadData = async (): Promise<false | Keychain.UserCredentials> =>
  Keychain.getGenericPassword({
    authenticationType:
      Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    service: 'wallet',
    authenticationPrompt: {
      title: 'Authentication needed',
      subtitle: 'Authentication needed for unlock your wallet',
      cancel: 'Cancel',
    },
  });

export const resetData = async (): Promise<boolean> =>
  Keychain.resetGenericPassword({service: 'wallet'});
