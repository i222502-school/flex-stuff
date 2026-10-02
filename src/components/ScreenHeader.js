import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { colors } from '../theme';

// Title at the top of every screen. The back button only shows if onBack is given.
export default function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      {onBack && (
        <Pressable
          onPress={onBack}
          hitSlop={12}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Icon name="back" size={22} color={colors.text} />
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
});
