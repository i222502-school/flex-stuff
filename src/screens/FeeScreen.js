import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import ChallanCard from '../components/ChallanCard';
import FeeRow from '../components/FeeRow';
import PillButton from '../components/PillButton';
import { FEE_PER_CREDIT_HOUR } from '../constants';
import { createChallan, getCourseKey, getFeeItems, getFeeTotal } from '../utils/fees';
import { formatMoney } from '../utils/helpers';
import { colors } from '../theme';

// challan / setChallan come from App.js so the challan stays after leaving this screen.
// challan is null until one is generated.
export default function FeeScreen({ registrations, challan, setChallan }) {
  const items = getFeeItems(registrations);
  const total = getFeeTotal(items);
  const totalCredits = items.reduce((sum, item) => sum + item.credits, 0);

  // The challan is outdated if courses were added/dropped after it was generated
  const isOutdated = challan !== null && challan.courseKey !== getCourseKey(registrations);

  if (items.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>Nothing to pay</Text>
        <Text style={styles.emptyText}>Register for courses to see your fee and generate a challan.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.summary}>
        <Text style={styles.label}>Semester fee</Text>
        <Text style={styles.bigNumber}>{formatMoney(total)}</Text>
        <Text style={styles.label}>
          {totalCredits} credit hours × {formatMoney(FEE_PER_CREDIT_HOUR)}
        </Text>
      </Card>

      {challan === null && (
        <View style={styles.generate}>
          <PillButton label="Generate challan" onPress={() => setChallan(createChallan(registrations))} />
        </View>
      )}

      {isOutdated && (
        <View style={styles.warning}>
          <Text style={styles.warningTitle}>Your registration has changed</Text>
          <Text style={styles.warningText}>
            This challan was for {formatMoney(challan.total)}. Your fee is now {formatMoney(total)}.
          </Text>
          <View style={styles.warningButton}>
            <PillButton label="Generate new challan" onPress={() => setChallan(createChallan(registrations))} />
          </View>
        </View>
      )}

      {challan !== null && (
        <ChallanCard challan={challan} onMarkPaid={() => setChallan({ ...challan, paid: true })} />
      )}

      <Text style={styles.sectionTitle}>Breakdown</Text>
      <Card style={styles.breakdown}>
        {items.map((item, index) => (
          <FeeRow
            key={item.code}
            title={item.name}
            subtitle={`${item.code} · ${item.credits} CH`}
            amount={formatMoney(item.amount)}
            color={item.color}
            isLast={index === items.length - 1}
          />
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatMoney(total)}</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  summary: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: colors.subtext,
  },
  bigNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginVertical: 4,
  },
  generate: {
    marginBottom: 24,
  },
  warning: {
    backgroundColor: colors.warningLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.warning,
  },
  warningText: {
    fontSize: 13,
    color: colors.text,
    marginTop: 4,
  },
  warningButton: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  breakdown: {
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.text,
    paddingVertical: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: colors.subtext,
    textAlign: 'center',
    marginTop: 6,
  },
});
