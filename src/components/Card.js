import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

// Dark rounded box used everywhere. Extra styles can be passed in with `style`.
export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
});
