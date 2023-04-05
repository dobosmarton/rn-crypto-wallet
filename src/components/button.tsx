import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, GREEN} from '../utils/colors';

type ButtonTypes = 'primary' | 'secondary' | 'tertiary';

type Props = Pick<PressableProps, 'disabled' | 'onPress' | 'hitSlop'> & {
  type?: ButtonTypes;
  isLoading?: boolean;
};

const getStyle = (type: ButtonTypes) => {
  switch (type) {
    case 'secondary':
      return secondaryStyles;
    case 'tertiary':
      return tertiaryStyles;
    case 'primary':
    default:
      return primaryStyles;
  }
};

export const Button: React.FunctionComponent<PropsWithChildren<Props>> = ({
  type = 'primary',
  isLoading,
  onPress,
  disabled,
  hitSlop,
  children,
}) => {
  const styles = getStyle(type);

  return (
    <Pressable
      hitSlop={hitSlop}
      disabled={disabled || isLoading}
      onPress={onPress}>
      <View style={[styles.buttonContainer, disabled ? styles.disabled : {}]}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={styles.buttonText.color} />
        ) : null}

        {!isLoading ? <Text style={styles.buttonText}>{children}</Text> : null}
      </View>
    </Pressable>
  );
};

const primaryStyles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 14,
    backgroundColor: GREEN,
    borderRadius: 160,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: BLUE,
  },
});

const secondaryStyles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 160,
    borderWidth: 2,
    borderColor: BLUE,
  },
  disabled: {
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: BLUE,
  },
});

const tertiaryStyles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: BLUE,
  },
});
