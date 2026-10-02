import { StatusBar } from 'expo-status-bar';
import { BackHandler, Platform, StatusBar as RNStatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import HomeScreen from './src/screens/HomeScreen';
import MarksScreen from './src/screens/MarksScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ScreenHeader from './src/components/ScreenHeader';
import { initialRegistrations } from './src/data/courses';
import { menuItems } from './src/data/menu';
import { colors } from './src/theme';

export default function App() {
  // Which screen is showing: 'home' or one of the menu keys ('marks', 'fee', ...)
  const [view, setView] = useState('home');

  // Registered courses live here so every screen sees the same list
  const [registrations, setRegistrations] = useState(initialRegistrations);

  // Android back button: go back to home instead of closing the app.
  // Re-registered whenever `view` changes; the old listener is removed first.
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (view !== 'home') {
        setView('home');
        return true; // we handled it
      }
      return false; // on home: let Android close the app
    });
    return () => subscription.remove();
  }, [view]);

  // Picks the screen for the current view
  function renderScreen() {
    if (view === 'profile') {
      return <ProfileScreen />;
    }
    if (view === 'registration') {
      return <RegistrationScreen registrations={registrations} setRegistrations={setRegistrations} />;
    }
    if (view === 'marks') {
      return <MarksScreen registrations={registrations} />;
    }
    return <Text style={styles.placeholder}>Coming soon</Text>;
  }

  if (view === 'home') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <HomeScreen onOpen={setView} />
      </View>
    );
  }

  const currentItem = menuItems.find((item) => item.key === view);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScreenHeader title={currentItem.title} onBack={() => setView('home')} />
      {renderScreen()}
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
  placeholder: {
    paddingHorizontal: 20,
    color: colors.subtext,
  },
});
