import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import { colors } from '../theme';

// One number on the dashboard, e.g. "Attendance 86.2%".
export default function StatTile({ label, value, caption, color = colors.text }) {
  return (
    <Card style={styles.tile}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.caption}>{caption}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: '48%',
    marginBottom: 12,
    padding: 14,
  },
  label: {
    fontSize: 12,
    color: colors.subtext,
    fontWeight: '600',
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  caption: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 2,
  },
});
