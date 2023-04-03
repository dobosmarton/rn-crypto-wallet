import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyableView} from './copyableView';

type Props = {
  label?: string;
  text?: string;
};

export const CopyableText: React.FunctionComponent<Props> = ({label, text}) => {
  const onCopy = () => {
    if (text) {
      Clipboard.setString(text);
    }
  };

  return (
    <CopyableView disabled={!text} label={label} onCopyPressed={onCopy}>
      <Text style={styles.text}>{text}</Text>
    </CopyableView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
});
