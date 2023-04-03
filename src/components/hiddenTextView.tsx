import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button} from './button';

type Props = {
  text?: string;
};

export const HiddenTextView: React.FunctionComponent<Props> = ({text}) => {
  const [isVisible, setVisible] = useState(false);
  const [isCopiedVisible, setCopiedVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onCopy = () => {
    if (text && !isCopiedVisible) {
      Clipboard.setString(text);
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
    <>
      <Pressable
        style={styles.container}
        disabled={!isVisible}
        onPress={onCopy}>
        {isVisible ? (
          <Text style={styles.text}>{text}</Text>
        ) : (
          <View style={styles.hiddenContainer}>
            <Text>Here is the private key of the account</Text>
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={1}
              reducedTransparencyFallbackColor="white"
            />
          </View>
        )}
        <Button
          type="tertiary"
          onPress={() => setVisible(_isVisible => !_isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </Pressable>
      {isCopiedVisible && (
        <View style={styles.copiedView}>
          <Text style={styles.copiedText}>
            The text is copied to the clipboard!
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    maxWidth: '80%',
  },
  hiddenContainer: {
    justifyContent: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dots: {
    flexDirection: 'row',
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
