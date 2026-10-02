import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Card from './Card';
import { GRADE_SCALE } from '../constants';
import { getGrade } from '../utils/marks';
import { colors } from '../theme';

// Grades we show "you need X%" for
const TARGET_GRADES = ['A', 'B', 'C'];

// "What if I score X% in everything that's left?"
// earned = weighted marks so far, covered = weight conducted so far (both out of 100)
export default function WhatIfCalculator({ earned, covered }) {
  const [input, setInput] = useState('');

  const remaining = 100 - covered;

  if (remaining === 0) {
    return (
      <Card style={styles.card}>
        <Text style={styles.title}>What if?</Text>
        <Text style={styles.subtitle}>All assessments are graded. Final total: {earned.toFixed(1)} / 100</Text>
      </Card>
    );
  }

  // Validate the input: must be a number from 0 to 100
  const value = Number(input);
  const isEmpty = input.trim() === '';
  const error = !isEmpty && (isNaN(value) || value < 0 || value > 100) ? 'Enter a number from 0 to 100' : '';
  const isValid = !isEmpty && error === '';

  const projected = earned + (remaining * value) / 100;

  // % needed in the remaining work for each target grade
  const targets = GRADE_SCALE.filter((g) => TARGET_GRADES.includes(g.grade)).map((g) => {
    const needed = ((g.min - earned) / remaining) * 100;
    let text = `${Math.ceil(needed)}%`;
    if (needed <= 0) text = 'Secured';
    if (needed > 100) text = 'Not possible';
    return { grade: g.grade, text, possible: needed <= 100 };
  });

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>What if?</Text>
      <Text style={styles.subtitle}>
        {remaining}% of the course is still left. How much do you expect to score in it?
      </Text>

      <TextInput
        style={[styles.input, error !== '' && styles.inputError]}
        value={input}
        onChangeText={setInput}
        placeholder="Expected % (e.g. 75)"
        placeholderTextColor="#727272"
        keyboardType="numeric"
        maxLength={5}
      />
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {isValid && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Projected total</Text>
          <Text style={styles.resultValue}>
            {projected.toFixed(1)} / 100 · {getGrade(projected)}
          </Text>
        </View>
      )}

      <Text style={styles.targetsLabel}>You need in the remaining work</Text>
      <View style={styles.targets}>
        {targets.map((t) => (
          <View key={t.grade} style={styles.target}>
            <Text style={styles.targetGrade}>{t.grade}</Text>
            <Text style={[styles.targetText, !t.possible && { color: colors.danger }]}>{t.text}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 4,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.cardHighlight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardHighlight,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 15,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 6,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  resultLabel: {
    fontSize: 14,
    color: colors.subtext,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  targetsLabel: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 16,
    marginBottom: 8,
  },
  targets: {
    flexDirection: 'row',
    gap: 8,
  },
  target: {
    flex: 1,
    backgroundColor: colors.cardHighlight,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  targetGrade: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  targetText: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 2,
  },
});
