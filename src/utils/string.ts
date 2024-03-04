export const shuffleCharacters = (value?: string): string => {
  const characters = value ? value.split('') : [];

  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = characters[i];
    characters[i] = characters[j];
    characters[j] = tmp;
  }
  return characters.join('');
};
