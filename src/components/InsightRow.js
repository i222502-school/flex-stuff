import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { colors } from '../theme';

const TONE_COLORS = {
  danger: colors.danger,
  warning: colors.warning,
};

// One "Needs attention" item. Tapping it opens the related screen.
export default function InsightRow({ insight, onPress, isLast }) {
  const color = TONE_COLORS[insight.tone];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, !isLast && styles.divider, pressed && styles.pressed]}
    >
      <Icon name="alert" size={22} color={color} />
      <View style={styles.middle}>
        <Text style={styles.title}>{insight.title}</Text>
        <Text style={styles.text}>{insight.text}</Text>
      </View>
      <Icon name="forward" size={18} color={colors.subtext} />
    </Pressable>
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
  pressed: {
    opacity: 0.6,
  },
  middle: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  text: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 2,
  },
});
