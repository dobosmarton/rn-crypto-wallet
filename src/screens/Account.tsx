import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BottomTabParamList} from '../libs/navigation/bottomTab';
import {SafeArea} from '../components/safeArea';
import {Header} from '../components/header';
import ChevronRight from '../../icons/chevron-right.svg';
import {useAccountState} from '../context/account.provider';
import {HiddenTextView} from '../components/textViews/hiddenTextView';
import {CopyableText} from '../components/textViews/copyableText';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Account'>;
};

export const AccountScreen: React.FunctionComponent<Props> = () => {
  const {account, signOut} = useAccountState();

  return (
    <SafeArea>
      <View style={styles.container}>
        <Header title="Account" type="primary" />
        <View style={styles.content}>
          <CopyableText label="Address" text={account?.address} />

          <HiddenTextView text={account?.privateKey} label="Private key" />

          <Pressable style={styles.itemRow} onPress={signOut}>
            <Text style={styles.itemRowTitle}>Log out</Text>
            <ChevronRight width={24} height={24} color={'#000'} />
          </Pressable>
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
