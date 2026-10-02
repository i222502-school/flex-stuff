import { CREDIT_HOURS } from '../constants';
import { offeredCourses } from '../data/courses';

// Theory = 3, Lab = 1 (from constants.js)
export function getCreditHours(course) {
  return CREDIT_HOURS[course.type];
}

// Turns [{ code, section }] into full course objects with the chosen section added
export function getRegisteredCourses(registrations) {
  return registrations.map((registration) => {
    const course = offeredCourses.find((c) => c.code === registration.code);
    return { ...course, section: registration.section };
  });
}

// Sum of credit hours of all registered courses
export function getTotalCredits(registrations) {
  return getRegisteredCourses(registrations).reduce((sum, course) => sum + getCreditHours(course), 0);
}
