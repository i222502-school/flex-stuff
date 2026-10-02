import { ATTENDANCE_THRESHOLD, LOW_MARKS_PERCENT } from '../constants';
import { getAttendanceSummary } from './attendance';
import { getRegisteredCourses } from './courses';
import { getCourseKey } from './fees';
import { formatLongDate, getToday } from './helpers';
import { getCourseResult } from './marks';

// Most serious first
const TONE_ORDER = { danger: 0, warning: 1 };

// Builds the "Needs attention" list from the current app data.
// Each insight: { id, tone, title, text, view } — view is the screen to open when tapped.
export function getInsights(registrations, attendance, challan) {
  const insights = [];
  const courses = getRegisteredCourses(registrations);

  courses.forEach((course) => {
    // Attendance
    const summary = getAttendanceSummary(attendance[course.code] || []);
    if (summary.status === 'short' || summary.status === 'risk') {
      insights.push({
        id: `att-${course.code}`,
        tone: summary.status === 'short' ? 'danger' : 'warning',
        title: `${course.name}: ${summary.percent.toFixed(1)}% attendance`,
        text: summary.status === 'short' ? `Below ${ATTENDANCE_THRESHOLD}%. ${summary.message}.` : `${summary.message}.`,
        view: 'attendance',
      });
    }

    // Marks
    const result = getCourseResult(course);
    if (result.percent !== null && result.percent < LOW_MARKS_PERCENT) {
      insights.push({
        id: `marks-${course.code}`,
        tone: result.percent < 50 ? 'danger' : 'warning',
        title: `${course.name}: ${result.percent.toFixed(1)}% marks`,
        text: 'Use the What-if calculator to see what you need in the remaining work.',
        view: 'marks',
      });
    }
  });

  // Fee challan
  if (courses.length > 0) {
    if (challan === null) {
      insights.push({
        id: 'fee',
        tone: 'warning',
        title: 'Fee challan not generated',
        text: 'Generate your challan before the due date.',
        view: 'fee',
      });
    } else if (challan.courseKey !== getCourseKey(registrations)) {
      insights.push({
        id: 'fee',
        tone: 'warning',
        title: 'Fee challan is outdated',
        text: 'Your courses changed after the challan was generated.',
        view: 'fee',
      });
    } else if (!challan.paid) {
      const overdue = getToday() > challan.dueDate;
      insights.push({
        id: 'fee',
        tone: overdue ? 'danger' : 'warning',
        title: overdue ? 'Fee challan overdue' : 'Fee challan unpaid',
        text: `Due date: ${formatLongDate(challan.dueDate)}.`,
        view: 'fee',
      });
    }
  }

  return insights.sort((a, b) => TONE_ORDER[a.tone] - TONE_ORDER[b.tone]);
}
