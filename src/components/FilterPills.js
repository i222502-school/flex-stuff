import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

// A row of choices where one is selected (green), like Spotify's filter chips.
export default function FilterPills({ options, selected, onSelect }) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.pill, isSelected && styles.selectedPill]}
          >
            <Text style={[styles.text, isSelected && styles.selectedText]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: colors.cardHighlight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  selectedPill: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  selectedText: {
    color: '#000000',
  },
});
