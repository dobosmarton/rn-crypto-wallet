import React, {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ButtonTypes = 'primary' | 'secondary' | 'tertiary';

type Props = {
  type?: ButtonTypes;
  onPress: (event: GestureResponderEvent) => void;
};

const getStyle = (_type: ButtonTypes) => {
  switch (_type) {
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
  onPress,
  children,
}) => {
  const styles = getStyle(type);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
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
