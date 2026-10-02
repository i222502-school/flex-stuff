import { StyleSheet, Text, View } from 'react-native';
import Badge from './Badge';
import Icon from './Icon';
import { formatDate } from '../utils/helpers';
import { colors } from '../theme';

// Which badge tone each status uses
const statusTones = {
  Ongoing: 'success',
  Upcoming: 'warning',
  Ended: 'neutral',
  TBA: 'neutral',
};

// One row of the academic calendar. `event` already has status and hint worked out.
export default function CalendarEvent({ event, isLast }) {
  // Show the date range if there is one, otherwise the note ("Updated soon")
  const dates = event.start ? `${formatDate(event.start)} – ${formatDate(event.end)}` : event.note;

  return (
    <View style={[styles.row, !isLast && styles.divider, event.status === 'Ended' && styles.faded]}>
      <View style={styles.iconBox}>
        <Icon name="calendar" size={20} color={colors.text} />
      </View>
      <View style={styles.middle}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.dates}>{dates}</Text>
        {event.hint !== '' && <Text style={styles.hint}>{event.hint}</Text>}
      </View>
      <Badge label={event.status} tone={statusTones[event.status]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  faded: {
    opacity: 0.5,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  middle: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  dates: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 2,
  },
  hint: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
});
