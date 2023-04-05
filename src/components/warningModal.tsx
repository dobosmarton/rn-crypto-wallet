import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button} from './button';

type Props = {
  text: string;
  isOpen: boolean;
  buttonText: string;
  buttonAction: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  setOpen: (isOpen: boolean) => void;
};

export const WarningModal: React.FunctionComponent<Props> = ({
  text,
  isOpen,
  buttonText,
  buttonAction,
  secondaryButtonText,
  secondaryButtonAction,
  setOpen,
}) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setOpen(!isOpen);
      }}>
      <BlurView
        style={styles.blurView}
        blurType="dark"
        blurAmount={3}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableWithoutFeedback onPress={() => setOpen(!isOpen)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            onPress={e => {
              e.stopPropagation();
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{text}</Text>
              <Button type="primary" onPress={buttonAction}>
                {buttonText}
              </Button>
              {secondaryButtonAction ? (
                <Button type="tertiary" onPress={secondaryButtonAction}>
                  {secondaryButtonText}
                </Button>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    gap: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
