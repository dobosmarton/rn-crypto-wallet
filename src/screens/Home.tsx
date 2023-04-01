import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from '../components/button';

export const HomeScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <View style={styles.buttonContainer}>
        <Button onPress={() => {}}>Continue</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
