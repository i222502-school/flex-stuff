import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import { colors } from '../theme';

// Wrapper for every dashboard chart: title, subtitle, then the chart —
// or a message instead of the chart when there is no data to draw.
export default function ChartCard({ title, subtitle, isEmpty, emptyText, children }) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {isEmpty ? <Text style={styles.empty}>{emptyText}</Text> : children}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    paddingHorizontal: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    fontSize: 12,
    color: colors.subtext,
    marginTop: 2,
    marginBottom: 12,
  },
  empty: {
    color: colors.subtext,
    paddingVertical: 30,
  },
});
