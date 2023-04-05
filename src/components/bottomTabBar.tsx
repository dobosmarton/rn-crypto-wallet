import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BLUE, GREEN, WHITE} from '../utils/colors';
import HomeIcon from '../../assets/icons/home.svg';
import AccountIcon from '../../assets/icons/account.svg';

const tabBarIcon = (routeName: string, isFocused: boolean) => {
  const renderIcon = (
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>,
  ) => (
    <Icon
      width={24}
      height={24}
      strokeWidth={isFocused ? 2 : 1}
      color={WHITE}
    />
  );

  switch (routeName) {
    case 'Home':
      return renderIcon(HomeIcon);
    case 'Account':
      return renderIcon(AccountIcon);
  }
};

export const BottomTabBar: React.FunctionComponent<BottomTabBarProps> = ({
  state,
  insets,
  navigation,
  descriptors,
}) => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <View style={styles.tabBarContainer}>
        <Animated.View style={[styles.activeBackground, animatedStyles]} />
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;

          const icon = tabBarIcon(route.name, isFocused);

          const onPress = () => {
            offset.value = withTiming(index * 94);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name, {merge: true});
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.touchableContainer}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}>
              <View style={[styles.tabItem]}>{icon}</View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabBarContainer: {
    width: 200,
    paddingHorizontal: 3,
    paddingVertical: 3,
    backgroundColor: BLUE,
    borderRadius: 100,
    flexDirection: 'row',
    marginBottom: 32,
  },
  touchableContainer: {
    flex: 1,
  },
  tabItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingVertical: 12,
  },
  activeBackground: {
    position: 'absolute',
    left: 3,
    top: 3,
    bottom: 3,
    backgroundColor: GREEN,
    width: 100,
    borderRadius: 100,
  },
});
