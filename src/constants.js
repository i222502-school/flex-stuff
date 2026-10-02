// All the "rules" of the portal live here so they are easy to find and change.

// Minimum attendance percentage required to sit the final exam
export const ATTENDANCE_THRESHOLD = 80;

// First day of classes — attendance weeks on the dashboard count from here
export const SEMESTER_START = '2026-08-17';

// Courses whose weighted marks are below this % get a warning on the dashboard
export const LOW_MARKS_PERCENT = 60;

// Every class (theory or lab) counts as 1.5 hours of attendance
export const HOURS_PER_CLASS = 1.5;

// Credit hours by course type
export const CREDIT_HOURS = {
  theory: 3,
  lab: 1,
};

// Most credit hours a student can register in one semester
export const MAX_CREDIT_HOURS = 18;

// Tuition charged per credit hour (PKR)
export const FEE_PER_CREDIT_HOUR = 10000;

// Days a student has to pay a challan after it is generated
export const CHALLAN_DUE_DAYS = 14;

// Minimum percentage for each grade, highest first (absolute grading)
export const GRADE_SCALE = [
  { grade: 'A', min: 86 },
  { grade: 'A-', min: 82 },
  { grade: 'B+', min: 78 },
  { grade: 'B', min: 74 },
  { grade: 'B-', min: 70 },
  { grade: 'C+', min: 66 },
  { grade: 'C', min: 62 },
  { grade: 'C-', min: 58 },
  { grade: 'D+', min: 54 },
  { grade: 'D', min: 50 },
  { grade: 'F', min: 0 },
];

// Weightage (out of 100) of each assessment type, by course type
export const MARK_WEIGHTS = {
  theory: {
    Quiz: 10,
    Assignment: 10,
    'Sessional 1': 15,
    'Sessional 2': 15,
    Project: 10,
    Final: 40,
  },
  lab: {
    'Lab Task': 30,
    'Lab Mid': 20,
    Project: 10,
    Final: 40,
  },
};
