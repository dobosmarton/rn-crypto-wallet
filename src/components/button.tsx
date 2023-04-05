import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  ButtonProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ButtonTypes = 'primary' | 'secondary' | 'tertiary';

type Props = Pick<ButtonProps, 'disabled' | 'onPress'> & {
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
  children,
}) => {
  const styles = getStyle(type);

  return (
    <Pressable disabled={disabled || isLoading} onPress={onPress}>
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
    backgroundColor: '#10A19D',
    borderRadius: 160,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});

const secondaryStyles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 160,
    borderWidth: 2,
    borderColor: '#000',
  },
  disabled: {
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
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
    color: '#000',
  },
});
