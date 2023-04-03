import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyableView} from './copyableView';
import EyeIcon from '../../../icons/eye.svg';
import EyeSlashIcon from '../../../icons/eye-slash.svg';

type Props = {
  label?: string;
  text?: string;
};

export const HiddenTextView: React.FunctionComponent<Props> = ({
  label,
  text,
}) => {
  const [isVisible, setVisible] = useState(false);

  const onCopy = () => {
    if (text) {
      Clipboard.setString(text);
    }
  };

  return (
    <CopyableView
      label={label}
      disabled={!isVisible || !text}
      onCopyPressed={onCopy}>
      {isVisible ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <View style={styles.hiddenContainer}>
          <Text style={styles.hiddenText}>{text}</Text>
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={2}
            reducedTransparencyFallbackColor="white"
          />
        </View>
      )}
      <Pressable
        hitSlop={24}
        onPress={() => setVisible(_isVisible => !_isVisible)}>
        {isVisible ? (
          <EyeSlashIcon width={24} height={24} color={'#000'} />
        ) : (
          <EyeIcon width={24} height={24} color={'#000'} />
        )}
      </Pressable>
    </CopyableView>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    marginRight: 18,
  },
  hiddenText: {
    fontSize: 14,
    fontWeight: '400',
    marginRight: 18,
    paddingLeft: 4,
  },
  hiddenContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
