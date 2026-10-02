import { SEMESTER_START } from '../constants';
import { getAttendanceSummary } from './attendance';
import { getRegisteredCourses } from './courses';
import { daysBetween } from './helpers';
import { getCourseResult } from './marks';

// Attendance % and marks % of every registered course (null when there is no data yet)
export function getCourseStats(registrations, attendance) {
  return getRegisteredCourses(registrations).map((course) => {
    const summary = getAttendanceSummary(attendance[course.code] || []);
    return {
      code: course.code,
      name: course.name,
      color: course.color,
      attendance: summary.percent,
      attendanceStatus: summary.status,
      marks: getCourseResult(course).percent,
    };
  });
}

// Average of the numbers in a list, ignoring nulls (null if nothing is left)
export function average(values) {
  const numbers = values.filter((v) => v !== null);
  if (numbers.length === 0) return null;
  return numbers.reduce((sum, v) => sum + v, 0) / numbers.length;
}

// Overall attendance % at the end of each week of the semester (all courses together).
// Returns { labels: ['W1', 'W2', ...], data: [100, 95.5, ...] }
export function getWeeklyAttendance(registrations, attendance) {
  // Every record of every registered course, with its week number added
  const records = registrations.flatMap((r) =>
    (attendance[r.code] || []).map((record) => ({
      ...record,
      week: Math.floor(daysBetween(SEMESTER_START, record.date) / 7) + 1,
    }))
  );

  if (records.length === 0) {
    return { labels: [], data: [] };
  }

  const lastWeek = Math.max(...records.map((r) => r.week));
  const labels = [];
  const data = [];

  for (let week = 1; week <= lastWeek; week++) {
    const soFar = records.filter((r) => r.week <= week);
    if (soFar.length === 0) continue;
    const attended = soFar.filter((r) => r.status !== 'A').length;
    labels.push(`W${week}`);
    data.push(Number(((attended / soFar.length) * 100).toFixed(1)));
  }

  return { labels, data };
}
