import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../assets/icons/close.svg';
import {BLUE} from '../utils/colors';

type Props = Pick<
  TextInputProps,
  | 'value'
  | 'editable'
  | 'selectTextOnFocus'
  | 'placeholder'
  | 'secureTextEntry'
  | 'autoCapitalize'
  | 'autoFocus'
  | 'onPressIn'
> & {
  errorMessage?: string;
  onChange?: (text: string) => void;
};

export const Input: React.FunctionComponent<Props> = ({
  placeholder,
  value,
  secureTextEntry,
  errorMessage,
  editable,
  selectTextOnFocus,
  autoCapitalize,
  autoFocus,
  onPressIn,
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
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onPressIn={onPressIn}
          onChangeText={text => onChange?.(text)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
        />
        {!isFocused && !!value && editable && (
          <TouchableOpacity onPress={() => onChange?.('')}>
            <CloseIcon width={20} height={20} color={BLUE} />
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
