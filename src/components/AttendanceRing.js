import { StyleSheet, Text, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import CourseDot from './CourseDot';
import { colors } from '../theme';

const STROKE = 9;

// Grey track behind the coloured ring (chart-kit draws the track with color(0.2))
const ringConfig = {
  backgroundGradientFrom: colors.card,
  backgroundGradientTo: colors.card,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

// One course's attendance as a single ring in the course's colour, with the % in the middle
// and its status (e.g. { text: 'Short', color: red }) underneath.
export default function AttendanceRing({ label, percent, color, status, size }) {
  // A ring at exactly 100% is drawn as an empty arc, so stop just short of it
  const value = Math.min(percent / 100, 0.999);

  return (
    <View style={[styles.item, { width: size }]}>
      <View>
        <ProgressChart
          data={{ data: [value], colors: [color] }}
          width={size}
          height={size}
          radius={size / 2 - STROKE - 4}
          strokeWidth={STROKE}
          chartConfig={ringConfig}
          hideLegend
          withCustomBarColorFromData
        />
        <View style={styles.center}>
          <Text style={styles.percent}>{Math.round(percent)}%</Text>
        </View>
      </View>
      <View style={styles.labelRow}>
        <CourseDot color={color} size={8} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={[styles.status, { color: status.color }]}>{status.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    marginBottom: 14,
  },
  center: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  status: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
});
