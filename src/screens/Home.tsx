import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {useAccountState} from '../context/account.provider';
import {BottomTabParamList} from '../navigation/bottomTab';
import {BLUE} from '../utils/colors';
import {Pager} from '../components/pager';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const {isBalanceLoading} = useAccountState();

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          {isBalanceLoading ? (
            <ActivityIndicator size={'small'} color={BLUE} />
          ) : (
            <Pager />
          )}
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    paddingVertical: 24,
  },
});
