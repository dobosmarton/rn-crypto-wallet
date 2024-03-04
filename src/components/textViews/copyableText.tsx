import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyableView} from './copyableView';

type Props = {
  label?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
};

export const CopyableText: React.FunctionComponent<Props> = ({
  label,
  text,
  textStyle,
}) => {
  const onCopy = () => {
    if (text) {
      Clipboard.setString(text);
    }
  };

  return (
    <CopyableView disabled={!text} label={label} onCopyPressed={onCopy}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </CopyableView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
});
