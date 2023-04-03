import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ButtonTypes = 'primary' | 'secondary' | 'tertiary';

type Props = {
  type?: ButtonTypes;
  isLoading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
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
  children,
}) => {
  const styles = getStyle(type);

  return (
    <Pressable disabled={isLoading} onPress={onPress}>
      <View style={styles.buttonContainer}>
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
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
