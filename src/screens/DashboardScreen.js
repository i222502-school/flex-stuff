import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import AttendanceRing from '../components/AttendanceRing';
import Card from '../components/Card';
import ChartCard from '../components/ChartCard';
import InsightRow from '../components/InsightRow';
import StatTile from '../components/StatTile';
import { ATTENDANCE_THRESHOLD, MAX_CREDIT_HOURS } from '../constants';
import { getOverallAttendance } from '../utils/attendance';
import { getTotalCredits } from '../utils/courses';
import { average, getCourseStats, getWeeklyAttendance } from '../utils/dashboard';
import { getFeeItems, getFeeTotal } from '../utils/fees';
import { formatMoney } from '../utils/helpers';
import { colors } from '../theme';

// Charts fill the card: screen width minus the screen's 20px padding on each side
const CHART_WIDTH = Dimensions.get('window').width - 40;

// Three attendance rings per row (minus the card's 16px side padding)
const RING_SIZE = Math.floor((CHART_WIDTH - 32) / 3);

// Shared dark look for every chart
const chartConfig = {
  backgroundGradientFrom: colors.card,
  backgroundGradientTo: colors.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(29, 185, 84, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(179, 179, 179, ${opacity})`,
  propsForBackgroundLines: { stroke: colors.border },
  propsForDots: { r: '4' },
  barPercentage: 0.7,
};

// Bars use their own course colours; white here keeps the value labels above them neutral
const barConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

// Status text under each attendance ring (same statuses as the Attendance screen)
const RING_STATUS = {
  safe: { text: 'Safe', color: colors.primary },
  risk: { text: 'At risk', color: colors.warning },
  short: { text: 'Short', color: colors.danger },
};

// Red / orange / green depending on how a % compares to the limits
function levelColor(percent, dangerBelow, warningBelow) {
  if (percent < dangerBelow) return colors.danger;
  if (percent < warningBelow) return colors.warning;
  return colors.primary;
}

export default function DashboardScreen({ registrations, attendance, challan, insights, onOpen }) {
  const stats = getCourseStats(registrations, attendance);

  // ---- Numbers for the stat tiles ----
  const overallAttendance = getOverallAttendance(registrations, attendance);
  const averageMarks = average(stats.map((s) => s.marks));
  const totalCredits = getTotalCredits(registrations);
  const feeItems = getFeeItems(registrations);
  const feeTotal = getFeeTotal(feeItems);

  let feeStatus = 'Not generated';
  if (challan !== null) feeStatus = challan.paid ? 'Paid' : 'Unpaid';

  // ---- Data for each chart ----
  // 1. Progress rings: one per course that has classes, lowest attendance first
  const withAttendance = stats
    .filter((s) => s.attendance !== null)
    .sort((a, b) => a.attendance - b.attendance);

  // 2. Line: overall attendance week by week, with the minimum as a second line
  const weekly = getWeeklyAttendance(registrations, attendance);
  const lineData = {
    labels: weekly.labels,
    datasets: [
      { data: weekly.data, color: (opacity = 1) => `rgba(29, 185, 84, ${opacity})`, strokeWidth: 3 },
      {
        data: weekly.data.map(() => ATTENDANCE_THRESHOLD),
        color: () => 'rgba(233, 20, 41, 0.7)',
        strokeWidth: 1,
        withDots: false,
      },
    ],
    legend: ['Attendance', `Minimum ${ATTENDANCE_THRESHOLD}%`],
  };

  // 3. Bars: weighted marks % of courses that have marks
  const withMarks = stats.filter((s) => s.marks !== null);
  const barData = {
    labels: withMarks.map((s) => s.code),
    datasets: [
      {
        data: withMarks.map((s) => Number(s.marks.toFixed(1))),
        colors: withMarks.map((s) => () => s.color),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tiles}>
        <StatTile
          label="Attendance"
          value={overallAttendance === null ? '–' : `${overallAttendance.toFixed(1)}%`}
          caption="all classes"
          color={overallAttendance === null ? colors.text : levelColor(overallAttendance, ATTENDANCE_THRESHOLD, ATTENDANCE_THRESHOLD + 5)}
        />
        <StatTile
          label="Marks"
          value={averageMarks === null ? '–' : `${averageMarks.toFixed(1)}%`}
          caption="average of courses"
          color={averageMarks === null ? colors.text : levelColor(averageMarks, 50, 70)}
        />
        <StatTile label="Credit hours" value={`${totalCredits}`} caption={`of ${MAX_CREDIT_HOURS} max`} />
        <StatTile
          label="Fee"
          value={formatMoney(feeTotal)}
          caption={feeStatus}
          color={feeStatus === 'Paid' ? colors.primary : colors.text}
        />
      </View>

      <Text style={styles.sectionTitle}>Needs attention</Text>
      <Card style={styles.insights}>
        {insights.length === 0 ? (
          <Text style={styles.allGood}>You're all caught up. Nothing needs attention.</Text>
        ) : (
          insights.map((insight, index) => (
            <InsightRow
              key={insight.id}
              insight={insight}
              onPress={() => onOpen(insight.view)}
              isLast={index === insights.length - 1}
            />
          ))
        )}
      </Card>

      <Text style={styles.sectionTitle}>Insights</Text>

      <ChartCard
        title="Attendance by course"
        subtitle={`Minimum ${ATTENDANCE_THRESHOLD}% · lowest first`}
        isEmpty={withAttendance.length === 0}
        emptyText="No classes recorded yet."
      >
        <View style={styles.rings}>
          {withAttendance.map((s) => (
            <AttendanceRing
              key={s.code}
              label={s.code}
              percent={s.attendance}
              color={s.color}
              status={RING_STATUS[s.attendanceStatus]}
              size={RING_SIZE}
            />
          ))}
        </View>
      </ChartCard>

      <ChartCard
        title="Attendance trend"
        subtitle="Overall attendance at the end of each week"
        isEmpty={weekly.data.length < 2}
        emptyText="Not enough weeks recorded yet."
      >
        <LineChart
          data={lineData}
          width={CHART_WIDTH}
          height={220}
          yAxisSuffix="%"
          chartConfig={chartConfig}
          bezier
        />
      </ChartCard>

      <ChartCard
        title="Marks by course"
        subtitle="Weighted marks so far (%) · each bar in its course colour"
        isEmpty={withMarks.length === 0}
        emptyText="No marks uploaded yet."
      >
        <BarChart
          data={barData}
          width={CHART_WIDTH}
          height={220}
          yAxisLabel=""
          yAxisSuffix="%"
          fromZero
          fromNumber={100}
          segments={4}
          showValuesOnTopOfBars
          showBarTops={false}
          withCustomBarColorFromData
          flatColor
          chartConfig={barConfig}
        />
      </ChartCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  insights: {
    paddingVertical: 4,
    marginBottom: 24,
  },
  rings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    paddingHorizontal: 16,
  },
  allGood: {
    color: colors.subtext,
    paddingVertical: 16,
    textAlign: 'center',
  },
});
