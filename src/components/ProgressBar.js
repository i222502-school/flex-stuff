import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

// Thin bar filled to `percent` (0–100), like Spotify's song progress bar.
export default function ProgressBar({ percent, color = colors.primary }) {
  // Keep the fill between 0% and 100% even if the number is out of range
  const width = Math.min(Math.max(percent, 0), 100);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${width}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4D4D4D',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
