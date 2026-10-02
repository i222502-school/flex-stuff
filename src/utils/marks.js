import { GRADE_SCALE, MARK_WEIGHTS } from '../constants';
import { marks } from '../data/marks';

// Works out a course's result from its uploaded marks.
// Within a type, marks are added up first: Quiz 8/10 + 6/10 = 14/20 = 70% of the quiz weight.
export function getCourseResult(course) {
  const list = marks[course.code] || [];
  const weights = MARK_WEIGHTS[course.type];

  // One group per assessment type, in the order of MARK_WEIGHTS
  const groups = Object.keys(weights).map((type) => {
    const items = list.filter((m) => m.type === type);
    const obtained = items.reduce((sum, m) => sum + m.obtained, 0);
    const total = items.reduce((sum, m) => sum + m.total, 0);
    const weighted = total > 0 ? (obtained / total) * weights[type] : 0;
    return { type, weight: weights[type], items, weighted };
  });

  // Only types that have been conducted count towards "so far"
  const conducted = groups.filter((g) => g.items.length > 0);
  const earned = conducted.reduce((sum, g) => sum + g.weighted, 0);
  const covered = conducted.reduce((sum, g) => sum + g.weight, 0);
  const percent = covered > 0 ? (earned / covered) * 100 : null;

  return { groups, earned, covered, percent };
}

// 76.4 -> 'B' (first grade in GRADE_SCALE whose minimum we reach)
export function getGrade(percent) {
  return GRADE_SCALE.find((g) => percent >= g.min).grade;
}
