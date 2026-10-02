import { CHALLAN_DUE_DAYS, FEE_PER_CREDIT_HOUR } from '../constants';
import { student } from '../data/student';
import { getCreditHours, getRegisteredCourses } from './courses';
import { addDays, getToday } from './helpers';

// One fee line per registered course: credit hours x rate
export function getFeeItems(registrations) {
  return getRegisteredCourses(registrations).map((course) => {
    const credits = getCreditHours(course);
    return {
      code: course.code,
      name: course.name,
      credits,
      amount: credits * FEE_PER_CREDIT_HOUR,
    };
  });
}

// Sum of a list of fee items
export function getFeeTotal(items) {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

// Same courses in any order give the same key, e.g. 'CL3001,CS3001,CS3006'
export function getCourseKey(registrations) {
  return registrations
    .map((r) => r.code)
    .sort()
    .join(',');
}

// Creates a new challan from the current registration
export function createChallan(registrations) {
  const items = getFeeItems(registrations);
  const issueDate = getToday();
  // Roll number without the dash + last 6 digits of the current time, e.g. FC-22I2502-483920
  const id = `FC-${student.rollNo.replace('-', '')}-${String(Date.now()).slice(-6)}`;

  return {
    id,
    issueDate,
    dueDate: addDays(issueDate, CHALLAN_DUE_DAYS),
    items,
    total: getFeeTotal(items),
    courseKey: getCourseKey(registrations),
    paid: false,
  };
}
