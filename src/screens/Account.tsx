import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BottomTabParamList} from '../libs/navigation/bottomTab';
import {SafeArea} from '../components/safeArea';
import {Header} from '../components/header';
import ChevronRight from '../../icons/chevron-right.svg';
import {useAccountState} from '../context/account.provider';
import {HiddenTextView} from '../components/textViews/hiddenTextView';
import {CopyableText} from '../components/textViews/copyableText';
import {WarningModal} from '../components/warningModal';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Account'>;
};

export const AccountScreen: React.FunctionComponent<Props> = () => {
  const {account, signOut} = useAccountState();
  const [isModalOpen, setModalOpen] = useState(false);

  const onSignOutButton = () => setModalOpen(true);

  const _signOut = async () => {
    setModalOpen(false);
    // conditional rendering in navigations
    // we have to wait the end of the modal closing animtaion
    setTimeout(() => {
      return signOut();
    }, 300);
  };

  return (
    <>
      <SafeArea>
        <View style={styles.container}>
          <Header title="Account" type="primary" />
          <View style={styles.content}>
            <CopyableText label="Address" text={account?.address} />

            <HiddenTextView text={account?.privateKey} label="Private key" />

            <Pressable style={styles.itemRow} onPress={onSignOutButton}>
              <Text style={styles.itemRowTitle}>Sign out</Text>
              <ChevronRight width={24} height={24} color={'#000'} />
            </Pressable>
          </View>
        </View>
      </SafeArea>
      <WarningModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        text="After signing out you will be able to restore the account only via your recovery words and password!"
        buttonText="Sign out"
        buttonAction={_signOut}
        secondaryButtonText="Cancel"
        secondaryButtonAction={() => setModalOpen(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    paddingVertical: 18,
    gap: 16,
  },
  itemRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemRowTitle: {
    fontSize: 18,
    fontWeight: '400',
  },
});
