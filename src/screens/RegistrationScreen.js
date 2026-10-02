import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import CourseCard from '../components/CourseCard';
import FilterPills from '../components/FilterPills';
import ProgressBar from '../components/ProgressBar';
import SearchBar from '../components/SearchBar';
import Toast from '../components/Toast';
import { MAX_CREDIT_HOURS } from '../constants';
import { offeredCourses } from '../data/courses';
import { getTotalCredits } from '../utils/courses';
import { colors } from '../theme';

const FILTERS = ['All', 'Registered', 'Not registered'];

// registrations / setRegistrations come from App.js, because other screens
// (marks, attendance, fee) also need to know which courses are registered.
export default function RegistrationScreen({ registrations, setRegistrations }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');

  // Hide the toast 2.5 seconds after it appears
  useEffect(() => {
    if (message === '') return;
    const timer = setTimeout(() => setMessage(''), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  const totalCredits = getTotalCredits(registrations);
  const creditsLeft = MAX_CREDIT_HOURS - totalCredits;

  // The section the student is registered in, or null
  function getRegisteredSection(code) {
    const registration = registrations.find((r) => r.code === code);
    return registration ? registration.section : null;
  }

  // Register a new course, or switch the section of one already registered
  function registerCourse(course, section) {
    if (getRegisteredSection(course.code) === null) {
      setRegistrations([...registrations, { code: course.code, section }]);
      setMessage(`Registered for ${course.name} (Section ${section})`);
    } else {
      setRegistrations(registrations.map((r) => (r.code === course.code ? { ...r, section } : r)));
      setMessage(`Switched ${course.name} to Section ${section}`);
    }
  }

  // Ask first, then remove the course
  function dropCourse(course) {
    Alert.alert('Drop course?', `${course.code} ${course.name} will be removed from your registration.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Drop',
        style: 'destructive',
        onPress: () => {
          setRegistrations(registrations.filter((r) => r.code !== course.code));
          setMessage(`Dropped ${course.name}`);
        },
      },
    ]);
  }

  // Search by code or name, then apply the selected filter
  const query = search.trim().toLowerCase();
  const visibleCourses = offeredCourses
    .filter((c) => c.code.toLowerCase().includes(query) || c.name.toLowerCase().includes(query))
    .filter((c) => {
      const isRegistered = getRegisteredSection(c.code) !== null;
      if (filter === 'Registered') return isRegistered;
      if (filter === 'Not registered') return !isRegistered;
      return true;
    });

  // Message shown when the list is empty
  let emptyText = 'No courses to show.';
  if (query !== '') emptyText = `No courses match "${search.trim()}".`;
  else if (filter === 'Registered') emptyText = "You haven't registered any courses yet.";
  else if (filter === 'Not registered') emptyText = "You're registered in every offered course.";

  const header = (
    <View style={styles.header}>
      <Card style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>
            {registrations.length} {registrations.length === 1 ? 'course' : 'courses'}
          </Text>
          <Text style={styles.summaryCredits}>
            {totalCredits} / {MAX_CREDIT_HOURS} credit hours
          </Text>
        </View>
        <ProgressBar
          percent={(totalCredits / MAX_CREDIT_HOURS) * 100}
          color={creditsLeft === 0 ? colors.warning : colors.primary}
        />
        <Text style={styles.summaryHint}>
          {creditsLeft === 0
            ? 'You have reached the credit hour limit.'
            : `${creditsLeft} credit ${creditsLeft === 1 ? 'hour' : 'hours'} left`}
        </Text>
      </Card>

      <SearchBar value={search} onChangeText={setSearch} placeholder="Search by course code or name" />
      <View style={styles.filters}>
        <FilterPills options={FILTERS} selected={filter} onSelect={setFilter} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleCourses}
        keyExtractor={(course) => course.code}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            registeredSection={getRegisteredSection(item.code)}
            creditsLeft={creditsLeft}
            onRegister={registerCourse}
            onDrop={dropCourse}
          />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text style={styles.empty}>{emptyText}</Text>}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
      <Toast message={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 16,
  },
  summary: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  summaryCredits: {
    fontSize: 13,
    color: colors.subtext,
    fontWeight: '600',
  },
  summaryHint: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 8,
  },
  filters: {
    marginTop: 14,
  },
  empty: {
    color: colors.subtext,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
