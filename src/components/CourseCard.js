import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Badge from './Badge';
import Card from './Card';
import CourseDot from './CourseDot';
import PillButton from './PillButton';
import { MAX_CREDIT_HOURS } from '../constants';
import { getCreditHours } from '../utils/courses';
import { colors } from '../theme';

// One course on the registration screen.
// registeredSection is the section the student is in, or null if not registered.
export default function CourseCard({ course, registeredSection, creditsLeft, onRegister, onDrop }) {
  // The section the student has tapped (starts as their current section)
  const [selected, setSelected] = useState(registeredSection);

  const isRegistered = registeredSection !== null;
  const credits = getCreditHours(course);
  const overLimit = !isRegistered && credits > creditsLeft;

  // Helpful message under the sections
  let hint = '';
  if (overLimit) {
    hint = `Adding this would go over the ${MAX_CREDIT_HOURS} credit hour limit`;
  } else if (!isRegistered && selected === null) {
    hint = 'Choose a section to register';
  }

  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <View style={styles.titleBlock}>
          <View style={styles.codeRow}>
            <CourseDot color={course.color} />
            <Text style={styles.code}>{course.code}</Text>
          </View>
          <Text style={styles.name}>{course.name}</Text>
        </View>
        {isRegistered && <Badge label={`Section ${registeredSection}`} tone="success" />}
      </View>

      <Text style={styles.meta}>
        {course.type === 'lab' ? 'Lab' : 'Theory'} · {credits} credit {credits === 1 ? 'hour' : 'hours'}
      </Text>

      <View style={styles.sections}>
        {course.sections.map((section) => {
          const isFull = section.seats === 0 && section.name !== registeredSection;
          const isSelected = section.name === selected;
          return (
            <Pressable
              key={section.name}
              disabled={isFull}
              onPress={() => setSelected(section.name)}
              style={[styles.section, isSelected && styles.sectionSelected, isFull && styles.sectionFull]}
            >
              <Text style={[styles.sectionName, isSelected && styles.selectedText]}>{section.name}</Text>
              <Text style={[styles.seats, isSelected && styles.selectedText]}>
                {isFull ? 'Full' : `${section.seats} ${section.seats === 1 ? 'seat' : 'seats'}`}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {hint !== '' && (
        <Text style={[styles.hint, overLimit && { color: colors.danger }]}>{hint}</Text>
      )}

      {/* Which button shows depends on the course's state */}
      {!isRegistered && (
        <PillButton
          label={selected ? `Register in Section ${selected}` : 'Register'}
          disabled={selected === null || overLimit}
          onPress={() => onRegister(course, selected)}
        />
      )}
      {isRegistered && selected !== registeredSection && (
        <View style={styles.buttonRow}>
          <View style={styles.flex}>
            <PillButton label="Cancel" variant="outline" onPress={() => setSelected(registeredSection)} />
          </View>
          <View style={styles.flex}>
            <PillButton label={`Switch to ${selected}`} onPress={() => onRegister(course, selected)} />
          </View>
        </View>
      )}
      {isRegistered && selected === registeredSection && (
        <PillButton label="Drop course" variant="outline" onPress={() => onDrop(course)} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
    marginRight: 8,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  code: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.subtext,
    letterSpacing: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  meta: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 4,
  },
  sections: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },
  section: {
    minWidth: 72,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.cardHighlight,
    alignItems: 'center',
  },
  sectionSelected: {
    backgroundColor: colors.primary,
  },
  sectionFull: {
    opacity: 0.35,
  },
  sectionName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  seats: {
    fontSize: 11,
    color: colors.subtext,
    marginTop: 2,
  },
  selectedText: {
    color: '#000000',
  },
  hint: {
    fontSize: 12,
    color: colors.subtext,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  flex: {
    flex: 1,
  },
});
