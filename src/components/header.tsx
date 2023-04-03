import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './button';

type HeaderTypes = 'primary' | 'secondary';

type Props = {
  title: string;
  type: HeaderTypes;
  onBack?: () => void;
};

const getStyle = (type: HeaderTypes) => {
  switch (type) {
    case 'secondary':
      return secondaryStyles;
    case 'primary':
    default:
      return primaryStyles;
  }
};

export const Header: React.FunctionComponent<Props> = ({
  title,
  type,
  onBack,
}) => {
  const style = getStyle(type);

  return (
    <View style={[styles.container, style.container]}>
      {onBack ? (
        <View style={styles.sideContainer}>
          <Button type="tertiary" onPress={onBack}>
            Back
          </Button>
        </View>
      ) : null}
      <Text style={[styles.title, style.title]}>{title}</Text>
      {onBack ? <View style={styles.sideContainer} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
  },
  sideContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {},
});

const primaryStyles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
});

const secondaryStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
