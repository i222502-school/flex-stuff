import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AssessmentGroup from '../components/AssessmentGroup';
import Card from '../components/Card';
import CourseDot from '../components/CourseDot';
import FilterPills from '../components/FilterPills';
import ProgressBar from '../components/ProgressBar';
import WhatIfCalculator from '../components/WhatIfCalculator';
import { getRegisteredCourses } from '../utils/courses';
import { getCourseResult, getGrade } from '../utils/marks';
import { colors } from '../theme';

export default function MarksScreen({ registrations }) {
  const courses = getRegisteredCourses(registrations);
  const [selectedCode, setSelectedCode] = useState(courses.length > 0 ? courses[0].code : null);

  if (courses.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>No courses yet</Text>
        <Text style={styles.emptyText}>Register for courses to see their marks here.</Text>
      </View>
    );
  }

  // If the selected course was dropped, fall back to the first one
  const course = courses.find((c) => c.code === selectedCode) || courses[0];
  const result = getCourseResult(course);
  const hasMarks = result.covered > 0;

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <FilterPills options={courses.map((c) => c.code)} selected={course.code} onSelect={setSelectedCode} />

      <Card style={styles.summary}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryText}>
            <Text style={styles.courseName}>{course.name}</Text>
            <View style={styles.metaRow}>
              <CourseDot color={course.color} />
              <Text style={styles.courseMeta}>
                {course.code} · Section {course.section}
              </Text>
            </View>
          </View>
          <View style={styles.gradeCircle}>
            <Text style={styles.gradeText}>{hasMarks ? getGrade(result.percent) : '–'}</Text>
          </View>
        </View>

        {hasMarks ? (
          <>
            <Text style={styles.bigNumber}>
              {result.earned.toFixed(1)}
              <Text style={styles.outOf}> / {result.covered}</Text>
            </Text>
            <Text style={styles.caption}>
              Weighted marks so far · {result.percent.toFixed(1)}%
            </Text>
            <ProgressBar percent={result.percent} />
          </>
        ) : (
          <Text style={styles.caption}>No marks uploaded yet for this course.</Text>
        )}
      </Card>

      {/* key resets the calculator's input when a different course is picked */}
      <WhatIfCalculator key={course.code} earned={result.earned} covered={result.covered} />

      <Text style={styles.sectionTitle}>Assessments</Text>
      {result.groups.map((group) => (
        <AssessmentGroup
          key={group.type}
          type={group.type}
          weight={group.weight}
          items={group.items}
          weighted={group.weighted}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  summary: {
    marginTop: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryText: {
    flex: 1,
    marginRight: 12,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  courseMeta: {
    fontSize: 13,
    color: colors.subtext,
  },
  gradeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
  },
  bigNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
  },
  outOf: {
    fontSize: 18,
    color: colors.subtext,
  },
  caption: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 2,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: colors.subtext,
    textAlign: 'center',
    marginTop: 6,
  },
});
