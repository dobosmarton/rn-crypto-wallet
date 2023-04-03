import React, {PropsWithChildren, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  label?: string;
  disabled?: boolean;
  onCopyPressed: () => void;
};

export const CopyableView: React.FunctionComponent<
  PropsWithChildren<Props>
> = ({label, disabled, children, onCopyPressed}) => {
  const [isCopiedVisible, setCopiedVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onCopy = () => {
    if (!isCopiedVisible) {
      onCopyPressed();
      setCopiedVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopiedVisible(false);
      }, 3000);
    }
  };

  return (
    <View style={styles.viewContainer}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable style={styles.container} disabled={disabled} onPress={onCopy}>
        {children}
      </Pressable>
      {isCopiedVisible && (
        <View style={styles.copiedView}>
          <Text style={styles.copiedText}>
            The text is copied to the clipboard!
          </Text>
        </View>
      )}
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
