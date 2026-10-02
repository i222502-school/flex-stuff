import { StatusBar } from 'expo-status-bar';
import { Platform, StatusBar as RNStatusBar, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import HomeScreen from './src/screens/HomeScreen';
import ScreenHeader from './src/components/ScreenHeader';
import { menuItems } from './src/data/menu';
import { colors } from './src/theme';

export default function App() {
  // Which screen is showing: 'home' or one of the menu keys ('marks', 'fee', ...)
  const [view, setView] = useState('home');

  const currentItem = menuItems.find((item) => item.key === view);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {view === 'home' ? (
        <HomeScreen onOpen={setView} />
      ) : (
        <View style={styles.screen}>
          <ScreenHeader title={currentItem.title} onBack={() => setView('home')} />
          <Text style={styles.placeholder}>Coming soon</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // Keep content below the phone's status bar (Android draws edge-to-edge)
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 50,
  },
  screen: {
    flex: 1,
  },
  placeholder: {
    paddingHorizontal: 20,
    color: colors.subtext,
  },
});
