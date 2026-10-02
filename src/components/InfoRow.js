import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

// A label on top and its value below, with a divider line unless it's the last row.
export default function InfoRow({ label, value, isLast }) {
  return (
    <View style={[styles.row, !isLast && styles.divider]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 12,
    color: colors.subtext,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
