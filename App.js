import { StatusBar } from 'expo-status-bar';
import { BackHandler, Platform, StatusBar as RNStatusBar, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import AttendanceScreen from './src/screens/AttendanceScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import FeeScreen from './src/screens/FeeScreen';
import HomeScreen from './src/screens/HomeScreen';
import MarksScreen from './src/screens/MarksScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ScreenHeader from './src/components/ScreenHeader';
import { attendance } from './src/data/attendance';
import { initialRegistrations } from './src/data/courses';
import { menuItems } from './src/data/menu';
import { getInsights } from './src/utils/insights';
import { colors } from './src/theme';

export default function App() {
  // Which screen is showing: 'home' or one of the menu keys ('marks', 'fee', ...)
  const [view, setView] = useState('home');

  // Registered courses live here so every screen sees the same list
  const [registrations, setRegistrations] = useState(initialRegistrations);

  // Attendance records too, so marking a class updates every screen (and the dashboard)
  const [attendanceRecords, setAttendanceRecords] = useState(attendance);

  // The generated fee challan (null until the student generates one)
  const [challan, setChallan] = useState(null);

  // Warnings worked out from the state above — recalculated on every render,
  // so they are always up to date (used by Home and Dashboard)
  const insights = getInsights(registrations, attendanceRecords, challan);

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
    if (view === 'attendance') {
      return (
        <AttendanceScreen
          registrations={registrations}
          attendance={attendanceRecords}
          setAttendance={setAttendanceRecords}
        />
      );
    }
    if (view === 'fee') {
      return <FeeScreen registrations={registrations} challan={challan} setChallan={setChallan} />;
    }
    return (
      <DashboardScreen
        registrations={registrations}
        attendance={attendanceRecords}
        challan={challan}
        insights={insights}
        onOpen={setView}
      />
    );
  }

  if (view === 'home') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <HomeScreen onOpen={setView} insights={insights} />
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
});
