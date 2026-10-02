import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { colors } from '../theme';

// Colour for a mark: red under 50%, orange under 70%, white otherwise
function markColor(obtained, total) {
  const percent = (obtained / total) * 100;
  if (percent < 50) return colors.danger;
  if (percent < 70) return colors.warning;
  return colors.text;
}

// All marks of one assessment type (e.g. every Quiz) with its weighted score.
export default function AssessmentGroup({ type, weight, items, weighted }) {
  const conducted = items.length > 0;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.weight}>
          {conducted ? `${weighted.toFixed(1)} / ${weight}` : `${weight}% weight`}
        </Text>
      </View>

      {!conducted && <Text style={styles.pending}>Not conducted yet</Text>}

      {items.map((item) => (
        <View key={item.title} style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.score, { color: markColor(item.obtained, item.total) }]}>
            {item.obtained} / {item.total}
          </Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  type: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  weight: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  pending: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  title: {
    fontSize: 14,
    color: colors.subtext,
  },
  score: {
    fontSize: 14,
    fontWeight: '700',
  },
});
