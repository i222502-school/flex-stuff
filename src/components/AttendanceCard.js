import { Pressable, StyleSheet, Text, View } from 'react-native';
import Badge from './Badge';
import Card from './Card';
import PillButton from './PillButton';
import ProgressBar from './ProgressBar';
import { ATTENDANCE_THRESHOLD } from '../constants';
import { formatDate } from '../utils/helpers';
import { colors } from '../theme';

// Label, badge tone and bar colour for each attendance status
const STATUS_INFO = {
  safe: { label: 'Safe', tone: 'success', color: colors.primary },
  risk: { label: 'At risk', tone: 'warning', color: colors.warning },
  short: { label: 'Short', tone: 'danger', color: colors.danger },
  none: { label: 'No classes', tone: 'neutral', color: colors.subtext },
};

// Colour of each record chip
const RECORD_COLORS = {
  P: colors.primary,
  L: colors.warning,
  A: colors.danger,
};

// One course's attendance. Tapping the card opens its class-by-class records.
export default function AttendanceCard({ course, records, summary, expanded, onToggle, onChangeStatus, onMarkToday }) {
  const info = STATUS_INFO[summary.status];

  // Newest class first
  const sortedRecords = [...records].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Card style={styles.card}>
      <Pressable onPress={onToggle}>
        <View style={styles.top}>
          <View style={styles.titleBlock}>
            <Text style={styles.code}>{course.code}</Text>
            <Text style={styles.name}>{course.name}</Text>
          </View>
          <Text style={[styles.percent, { color: info.color }]}>
            {summary.percent === null ? '–' : `${summary.percent.toFixed(1)}%`}
          </Text>
        </View>

        <View style={styles.bar}>
          <ProgressBar percent={summary.percent || 0} color={info.color} marker={ATTENDANCE_THRESHOLD} />
        </View>

        <View style={styles.bottom}>
          <Text style={styles.hours}>
            {summary.attendedHours} / {summary.totalHours} hrs
          </Text>
          <Badge label={info.label} tone={info.tone} />
        </View>
        <Text style={[styles.message, { color: info.color }]}>{summary.message}</Text>
      </Pressable>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.counts}>
            {summary.attended - summary.late} present · {summary.late} late · {summary.absent} absent
          </Text>

          <Text style={styles.label}>Mark today's class</Text>
          <View style={styles.markRow}>
            <View style={styles.flex}>
              <PillButton label="Present" onPress={() => onMarkToday('P')} />
            </View>
            <View style={styles.flex}>
              <PillButton label="Late" variant="outline" onPress={() => onMarkToday('L')} />
            </View>
            <View style={styles.flex}>
              <PillButton label="Absent" variant="outline" onPress={() => onMarkToday('A')} />
            </View>
          </View>

          <Text style={styles.label}>Classes · tap one to change it</Text>
          {sortedRecords.length === 0 && <Text style={styles.empty}>No classes recorded yet.</Text>}
          <View style={styles.records}>
            {sortedRecords.map((record) => (
              <Pressable
                key={record.date}
                onPress={() => onChangeStatus(record.date)}
                style={[styles.record, { borderColor: RECORD_COLORS[record.status] }]}
              >
                <Text style={styles.recordDate}>{formatDate(record.date)}</Text>
                <Text style={[styles.recordStatus, { color: RECORD_COLORS[record.status] }]}>
                  {record.status}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
    marginRight: 8,
  },
  code: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.subtext,
    letterSpacing: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  percent: {
    fontSize: 22,
    fontWeight: '800',
  },
  bar: {
    marginTop: 14,
    marginBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hours: {
    fontSize: 13,
    color: colors.subtext,
  },
  message: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 14,
    paddingTop: 14,
  },
  counts: {
    fontSize: 13,
    color: colors.text,
  },
  label: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 16,
    marginBottom: 8,
  },
  markRow: {
    flexDirection: 'row',
    gap: 8,
  },
  flex: {
    flex: 1,
  },
  empty: {
    fontSize: 13,
    color: colors.subtext,
  },
  records: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  record: {
    width: 64,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: colors.cardHighlight,
  },
  recordDate: {
    fontSize: 11,
    color: colors.subtext,
  },
  recordStatus: {
    fontSize: 15,
    fontWeight: '800',
  },
});
