import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CloseIcon from '../../assets/icons/close.svg';
import {BLUE} from '../utils/colors';

type Props = Pick<
  TextInputProps,
  | 'value'
  | 'editable'
  | 'keyboardType'
  | 'selectTextOnFocus'
  | 'placeholder'
  | 'secureTextEntry'
  | 'autoCapitalize'
  | 'autoFocus'
  | 'onPressIn'
  | 'multiline'
  | 'numberOfLines'
> & {
  errorMessage?: string;
  postfix?: string;
  style?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
};

export const Input: React.FunctionComponent<Props> = ({
  placeholder,
  value,
  secureTextEntry,
  errorMessage,
  editable,
  keyboardType,
  selectTextOnFocus,
  autoCapitalize,
  autoFocus,
  postfix,
  numberOfLines,
  multiline,
  style,
  onPressIn,
  onChange,
}) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <>
      <View
        style={[
          styles.container,
          errorMessage ? styles.errorContainer : {},
          style,
        ]}>
        <TextInput
          style={styles.input}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          selectTextOnFocus={selectTextOnFocus}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onPressIn={onPressIn}
          onChangeText={text => onChange?.(text)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize={autoCapitalize}
          numberOfLines={numberOfLines}
          autoFocus={autoFocus}
          multiline={multiline}
        />
        {!isFocused && !!value && editable && (
          <TouchableOpacity onPress={() => onChange?.('')}>
            <CloseIcon width={20} height={20} color={BLUE} />
          </TouchableOpacity>
        )}
        {postfix ? <Text style={styles.postfix}>{postfix}</Text> : null}
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
    alignItems: 'center',
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
  postfix: {
    color: '#474E68',
    fontSize: 14,
  },
});
