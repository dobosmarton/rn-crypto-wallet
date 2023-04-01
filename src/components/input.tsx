import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import CloseIcon from '../../icons/close.svg';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export const Input: React.FunctionComponent<Props> = ({value, onChange}) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChange={e => onChange(e.nativeEvent.text)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {!isFocused && !!value && (
        <TouchableOpacity onPress={() => onChange('')}>
          <CloseIcon width={20} height={20} color={'#474E68'} />
        </TouchableOpacity>
      )}
    </View>
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
  input: {
    flexGrow: 1,
    fontSize: 16,
  },
});
