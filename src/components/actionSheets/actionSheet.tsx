import React, {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';

type Props = {
  hasMaxHeight?: boolean;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
};

export const ActionSheet: React.FunctionComponent<PropsWithChildren<Props>> = ({
  hasMaxHeight,
  isVisible,
  setVisible,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setVisible(!isVisible)}>
      <BlurView
        style={styles.blurView}
        blurType="dark"
        blurAmount={3}
        reducedTransparencyFallbackColor="white"
      />

      <TouchableWithoutFeedback onPress={() => setVisible(!isVisible)}>
        <KeyboardAvoidingView
          style={styles.screenContainer}
          keyboardVerticalOffset={-insets.bottom}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={e => {
              e.stopPropagation();
            }}>
            <View
              style={[
                styles.modalContainer,
                {marginTop: insets.top + 32, paddingBottom: insets.bottom},
                hasMaxHeight ? styles.maxHeight : {},
              ]}>
              <View
                style={[
                  styles.modalView,
                  hasMaxHeight ? styles.maxHeight : {},
                ]}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  maxHeight: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
});
