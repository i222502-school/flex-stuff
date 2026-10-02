import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Badge from '../components/Badge';
import CalendarEvent from '../components/CalendarEvent';
import Card from '../components/Card';
import MenuTile from '../components/MenuTile';
import { student } from '../data/student';
import { calendar } from '../data/calendar';
import { menuItems } from '../data/menu';
import { getEventStatus, getInitials, getToday } from '../utils/helpers';
import { colors } from '../theme';

// Calendar events are shown in this order: what's happening now comes first
const STATUS_ORDER = { Ongoing: 0, Upcoming: 1, TBA: 2, Ended: 3 };

// "Good morning / afternoon / evening" depending on the current hour
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// onOpen(key) is passed down from App.js — it changes which view is shown.
export default function HomeScreen({ onOpen }) {
  // Small pills under the name, built from the student object
  const details = [student.degree, `Batch ${student.batch}`, student.section, student.campus];

  // Add a status to every event, then sort by STATUS_ORDER
  const today = getToday();
  const events = calendar
    .map((event) => getEventStatus(event, today))
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>{getGreeting()}</Text>

      <Card style={styles.profileCard}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(student.personal.name)}</Text>
          </View>
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{student.personal.name}</Text>
            <Text style={styles.rollNo}>{student.rollNo}</Text>
          </View>
          <Badge label={student.status} tone={student.status === 'Current' ? 'success' : 'warning'} />
        </View>

        <View style={styles.pills}>
          {details.map((detail) => (
            <Text key={detail} style={styles.pill}>
              {detail}
            </Text>
          ))}
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Your portal</Text>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <MenuTile
            key={item.key}
            title={item.title}
            description={item.description}
            icon={item.icon}
            color={item.color}
            onPress={() => onOpen(item.key)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Academic calendar</Text>
      <Card style={styles.calendarCard}>
        {events.length === 0 ? (
          <Text style={styles.empty}>No calendar events yet.</Text>
        ) : (
          events.map((event, index) => (
            <CalendarEvent key={event.id} event={event} isLast={index === events.length - 1} />
          ))
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  profileCard: {
    marginBottom: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  rollNo: {
    fontSize: 14,
    color: colors.subtext,
    marginTop: 2,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  pill: {
    backgroundColor: colors.cardHighlight,
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calendarCard: {
    paddingVertical: 4,
    marginBottom: 20,
  },
  empty: {
    color: colors.subtext,
    paddingVertical: 16,
    textAlign: 'center',
  },
});
