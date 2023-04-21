import React, {PropsWithChildren, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import {Pagination} from './pagination';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const Pager: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  const childrenLength =
    children && Array.isArray(children) ? children.length : 1;

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
        {children}
      </AnimatedPagerView>
      <View style={styles.contentContainer}>
        <Pagination
          dataLength={childrenLength}
          positionAnimatedValue={positionAnimatedValue}
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    paddingTop: 8,
  },
  contentContainer: {
    flex: 2,
  },
});
