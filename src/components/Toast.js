import { StyleSheet, Text, View } from 'react-native';

// Small message at the bottom of the screen ("Registered for ..."), like Spotify's
// "Added to Liked Songs". Shows nothing when message is empty.
export default function Toast({ message }) {
  if (message === '') {
    return null;
  }

  return (
    <View style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
});
