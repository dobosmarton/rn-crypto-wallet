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
  Keychain.getGenericPassword();

export const resetData = async (): Promise<boolean> =>
  Keychain.resetGenericPassword({service: 'wallet'});
