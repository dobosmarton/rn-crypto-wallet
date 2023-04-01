import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './button';

type Props = {
  title: string;
  onBack: () => void;
};

export const Header: React.FunctionComponent<Props> = ({title, onBack}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sideContainer}>
        <Button type="tertiary" onPress={onBack}>
          Back
        </Button>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.sideContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
  },
  sideContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
