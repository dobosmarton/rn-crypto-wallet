import React, {useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import {CurrencyBalance} from './currencyBalance';
import {useAccountState} from '../context/account.provider';
import {BLUE} from '../utils/colors';
import {Pagination} from './pagination';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const Pager: React.FunctionComponent = () => {
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  const {accounts} = useAccountState();

  const data = Object.keys(accounts).map(acc => ({
    name: acc,
    balance: accounts[acc].balanceText,
  }));

  return (
    <>
      <AnimatedPagerView
        style={styles.pagerView}
        initialPage={0}
        orientation={'horizontal'}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
          [
            {
              nativeEvent: {
                offset: scrollOffsetAnimatedValue,
                position: positionAnimatedValue,
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}>
        {data.map(balanceItem => (
          <View key={balanceItem.name} style={styles.currencyCard}>
            <CurrencyBalance
              name={balanceItem.name}
              balance={balanceItem.balance}
            />
          </View>
        ))}
      </AnimatedPagerView>
      <Pagination
        data={data}
        positionAnimatedValue={positionAnimatedValue}
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
      />
    </>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    height: 200,
    paddingTop: 8,
  },
  currencyCard: {
    height: 180,
    paddingVertical: 24,
    paddingHorizontal: 32,
    width: '90%',
    backgroundColor: BLUE,
    marginLeft: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
