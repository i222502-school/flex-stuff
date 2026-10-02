import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

// Text colour + background for each kind of badge
const tones = {
  success: { color: colors.success, backgroundColor: colors.successLight },
  warning: { color: colors.warning, backgroundColor: colors.warningLight },
  danger: { color: colors.danger, backgroundColor: colors.dangerLight },
  neutral: { color: colors.subtext, backgroundColor: colors.cardHighlight },
  light: { color: colors.text, backgroundColor: colors.cardHighlight },
};

// Small rounded label, e.g. <Badge label="Ongoing" tone="success" />
export default function Badge({ label, tone = 'neutral' }) {
  return (
    <View style={[styles.badge, { backgroundColor: tones[tone].backgroundColor }]}>
      <Text style={[styles.text, { color: tones[tone].color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
