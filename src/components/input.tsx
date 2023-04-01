import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../icons/close.svg';

type Props = {
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
  onChange?: (text: string) => void;
};

export const Input: React.FunctionComponent<Props> = ({
  placeholder,
  value,
  secureTextEntry,
  errorMessage,
  onChange,
}) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <>
      <View
        style={[styles.container, errorMessage ? styles.errorContainer : {}]}>
        <TextInput
          style={styles.input}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onChangeText={text => onChange?.(text)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!isFocused && !!value && (
          <TouchableOpacity onPress={() => onChange?.('')}>
            <CloseIcon width={20} height={20} color={'#474E68'} />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingLeft: 24,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#474E68',
    flexDirection: 'row',
  },
  errorContainer: {
    borderColor: '#E63E6D',
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
  },
  errorMessage: {
    color: '#E63E6D',
  },
});
