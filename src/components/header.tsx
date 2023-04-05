import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './button';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import {BLUE} from '../utils/colors';

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
          <Button type="tertiary" hitSlop={40} onPress={onBack}>
            <ChevronLeft width={20} height={20} color={BLUE} />
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
