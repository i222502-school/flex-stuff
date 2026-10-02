import { StyleSheet, Text, View } from 'react-native';
import Badge from './Badge';
import PillButton from './PillButton';
import { student } from '../data/student';
import { formatLongDate, formatMoney, getToday } from '../utils/helpers';
import { colors } from '../theme';

// The generated challan, styled like a ticket / receipt.
export default function ChallanCard({ challan, onMarkPaid }) {
  // Paid, Overdue (past the due date) or Unpaid
  let status = { label: 'Unpaid', tone: 'warning' };
  if (challan.paid) status = { label: 'Paid', tone: 'success' };
  else if (getToday() > challan.dueDate) status = { label: 'Overdue', tone: 'danger' };

  const rows = [
    { label: 'Student', value: `${student.personal.name} (${student.rollNo})` },
    { label: 'Issue date', value: formatLongDate(challan.issueDate) },
    { label: 'Due date', value: formatLongDate(challan.dueDate) },
    { label: 'Courses', value: `${challan.items.length}` },
  ];

  return (
    <View style={styles.ticket}>
      <View style={styles.top}>
        <View>
          <Text style={styles.label}>Challan No.</Text>
          <Text style={styles.id}>{challan.id}</Text>
        </View>
        <Badge label={status.label} tone={status.tone} />
      </View>

      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}

      {/* Dashed line like a tear-off receipt */}
      <View style={styles.dashed} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Amount payable</Text>
        <Text style={styles.total}>{formatMoney(challan.total)}</Text>
      </View>

      {!challan.paid && (
        <View style={styles.button}>
          <PillButton label="Mark as paid" onPress={onMarkPaid} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: colors.cardHighlight,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  id: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 13,
    color: colors.subtext,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  dashed: {
    height: 1,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dashed',
    borderColor: '#727272',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  total: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  button: {
    marginTop: 14,
  },
});
