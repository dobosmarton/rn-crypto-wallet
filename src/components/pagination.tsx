import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

type Props = {
  data: {name: string}[];
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
};

const DOT_SIZE = 40;

export const Pagination: React.FunctionComponent<Props> = ({
  data,
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
}) => {
  const inputRange = [0, data.length];
  const translateX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, data.length * DOT_SIZE],
  });

  return (
    <View style={styles.pagination}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            transform: [{translateX: translateX}],
          },
        ]}
      />
      {data.map(item => {
        return (
          <View key={item.name} style={styles.paginationDotContainer}>
            <View style={styles.paginationDot} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    height: DOT_SIZE,
    alignSelf: 'center',
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
    backgroundColor: '#51557E',
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});
