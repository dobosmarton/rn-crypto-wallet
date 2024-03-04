import React, {PropsWithChildren, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import {Pagination} from './pagination';

type Props = {
  onPageSelected?: (position: number) => void;
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const Pager: React.FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  onPageSelected,
}) => {
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  const childrenLength =
    children && Array.isArray(children) ? children.length : 1;

  return (
    <View style={styles.pagerView}>
      <AnimatedPagerView
        style={styles.content}
        initialPage={0}
        onPageSelected={position =>
          onPageSelected?.(position.nativeEvent.position)
        }
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
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    paddingTop: 8,
  },
  content: {
    height: 240,
  },
  contentContainer: {},
});
