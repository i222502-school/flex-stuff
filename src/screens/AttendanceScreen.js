import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AttendanceCard from '../components/AttendanceCard';
import Card from '../components/Card';
import FilterPills from '../components/FilterPills';
import { ATTENDANCE_THRESHOLD, HOURS_PER_CLASS } from '../constants';
import { getAttendanceSummary, getOverallAttendance } from '../utils/attendance';
import { getRegisteredCourses } from '../utils/courses';
import { getToday } from '../utils/helpers';
import { colors } from '../theme';

const FILTERS = ['All', 'At risk'];

// Tapping a class record cycles its status: Present -> Late -> Absent -> Present
const NEXT_STATUS = { P: 'L', L: 'A', A: 'P' };

// attendance / setAttendance come from App.js: { CS3001: [{ date, status }], ... }
export default function AttendanceScreen({ registrations, attendance, setAttendance }) {
  const [filter, setFilter] = useState('All');
  const [expandedCode, setExpandedCode] = useState(null);

  // Give each registered course its records and summary
  const courses = getRegisteredCourses(registrations).map((course) => {
    const records = attendance[course.code] || [];
    return { ...course, records, summary: getAttendanceSummary(records) };
  });

  // Lowest attendance first so problems are at the top; courses with no classes go last
  const sorted = [...courses].sort((a, b) => {
    const aPercent = a.summary.percent === null ? 101 : a.summary.percent;
    const bPercent = b.summary.percent === null ? 101 : b.summary.percent;
    return aPercent - bPercent;
  });

  const visible =
    filter === 'At risk'
      ? sorted.filter((c) => c.summary.status === 'short' || c.summary.status === 'risk')
      : sorted;

  // Overall numbers across all registered courses
  const overall = getOverallAttendance(registrations, attendance);
  const shortCount = courses.filter((c) => c.summary.status === 'short').length;

  // Replace one course's list of records, keeping every other course the same
  function updateRecords(code, newRecords) {
    setAttendance({ ...attendance, [code]: newRecords });
  }

  function changeStatus(code, date) {
    const records = attendance[code] || [];
    updateRecords(
      code,
      records.map((r) => (r.date === date ? { ...r, status: NEXT_STATUS[r.status] } : r))
    );
  }

  // Add today's class, or update it if today is already marked
  function markToday(code, status) {
    const today = getToday();
    const records = attendance[code] || [];
    const alreadyMarked = records.some((r) => r.date === today);
    updateRecords(
      code,
      alreadyMarked
        ? records.map((r) => (r.date === today ? { ...r, status } : r))
        : [...records, { date: today, status }]
    );
  }

  if (courses.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>No courses yet</Text>
        <Text style={styles.emptyText}>Register for courses to track attendance.</Text>
      </View>
    );
  }

  const header = (
    <View>
      <Card style={styles.overview}>
        <View style={styles.overviewRow}>
          <View>
            <Text style={styles.overviewLabel}>Overall attendance</Text>
            <Text style={styles.overviewValue}>{overall === null ? '–' : `${overall.toFixed(1)}%`}</Text>
          </View>
          <View style={styles.overviewRight}>
            <Text style={[styles.shortCount, shortCount > 0 && { color: colors.danger }]}>{shortCount}</Text>
            <Text style={styles.overviewLabel}>{shortCount === 1 ? 'course short' : 'courses short'}</Text>
          </View>
        </View>
        <Text style={styles.rule}>
          Minimum {ATTENDANCE_THRESHOLD}% · each class is {HOURS_PER_CLASS} hrs · late counts as present
        </Text>
      </Card>
      <View style={styles.filters}>
        <FilterPills options={FILTERS} selected={filter} onSelect={setFilter} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={visible}
      keyExtractor={(course) => course.code}
      renderItem={({ item }) => (
        <AttendanceCard
          course={item}
          records={item.records}
          summary={item.summary}
          expanded={expandedCode === item.code}
          onToggle={() => setExpandedCode(expandedCode === item.code ? null : item.code)}
          onChangeStatus={(date) => changeStatus(item.code, date)}
          onMarkToday={(status) => markToday(item.code, status)}
        />
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <Text style={styles.listEmpty}>
          Nice! None of your courses are below or close to {ATTENDANCE_THRESHOLD}%.
        </Text>
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  overview: {
    marginBottom: 16,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  overviewLabel: {
    fontSize: 13,
    color: colors.subtext,
  },
  overviewValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  overviewRight: {
    alignItems: 'flex-end',
  },
  shortCount: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  rule: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 12,
  },
  filters: {
    marginBottom: 16,
  },
  listEmpty: {
    color: colors.subtext,
    textAlign: 'center',
    marginTop: 30,
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
