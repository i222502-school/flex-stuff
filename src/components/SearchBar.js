import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from './Icon';
import { colors } from '../theme';

// White Spotify-style search box. The clear (x) button only shows when there is text.
export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.box}>
      <Icon name="search" size={20} color="#121212" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#535353"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        maxLength={40}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={10}>
          <Icon name="close" size={18} color="#121212" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#121212',
    marginLeft: 10,
  },
});
