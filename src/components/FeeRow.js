import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

// A title + subtitle on the left and an amount on the right.
export default function FeeRow({ title, subtitle, amount, isLast }) {
  return (
    <View style={[styles.row, !isLast && styles.divider]}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
});
