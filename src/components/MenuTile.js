import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { colors } from '../theme';

// One tappable tile on the home screen. Lightens slightly while pressed.
export default function MenuTile({ title, description, icon, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <Icon name={icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  pressed: {
    backgroundColor: colors.cardHighlight,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 4,
  },
});
