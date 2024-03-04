import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Input} from '../input';
import {Button} from '../button';

import wordList from '../../libs/mnemonics/words.json';
import {useDebounce} from '../../hooks/useDebounce';
import {ActionSheet} from './actionSheet';

type Props = {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  onSelect: (word: string) => Promise<void>;
};

export const WordListSheet: React.FunctionComponent<Props> = ({
  isVisible,
  setVisible,
  onSelect,
}) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  const _setVisible = (_isVisible: boolean) => {
    setVisible(_isVisible);
    setSearchText('');
  };

  const _onSelect = (word: string) => {
    onSelect(word);
    _setVisible(false);
  };

  const dataList = useMemo(() => {
    return wordList.filter(item =>
      item.includes(debouncedSearchText.toLowerCase()),
    );
  }, [debouncedSearchText]);

  return (
    <ActionSheet hasMaxHeight isVisible={isVisible} setVisible={_setVisible}>
      <Text style={styles.title}>Select a recovery word</Text>

      <Input
        placeholder="Type to search for a word"
        value={searchText}
        onChange={setSearchText}
        autoCapitalize="none"
        autoFocus
      />

      <FlatList
        data={dataList}
        style={styles.list}
        renderItem={wordItem => (
          <TouchableOpacity
            key={wordItem.item}
            onPress={() => _onSelect(wordItem.item)}>
            <View style={styles.wordItem}>
              <Text style={styles.wordText}>{wordItem.item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        <Button type="tertiary" onPress={() => _setVisible(false)}>
          Cancel
        </Button>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    gap: 12,
  },
  list: {
    flex: 1,
  },
  wordItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
  },
  wordText: {
    fontSize: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
});
