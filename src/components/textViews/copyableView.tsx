import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';

type Props = {
  label?: string;
  disabled?: boolean;
  onCopyPressed: () => void;
};

export const CopyableView: React.FunctionComponent<
  PropsWithChildren<Props>
> = ({label, disabled, children, onCopyPressed}) => {
  const onCopy = () => {
    onCopyPressed();

    Snackbar.show({
      text: `The  ${label ?? 'text'} is copied to the clipboard!`,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  return (
    <View style={styles.viewContainer}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable style={styles.container} disabled={disabled} onPress={onCopy}>
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  copiedText: {
    color: '#FFF',
    fontWeight: '600',
  },
  copiedView: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#474E68',
  },
});
