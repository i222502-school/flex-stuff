// All the "rules" of the portal live here so they are easy to find and change.

// Minimum attendance percentage required to sit the final exam
export const ATTENDANCE_THRESHOLD = 80;

// Every class (theory or lab) counts as 1.5 hours of attendance
export const HOURS_PER_CLASS = 1.5;

// Credit hours by course type
export const CREDIT_HOURS = {
  theory: 3,
  lab: 1,
};

// Tuition charged per credit hour (PKR)
export const FEE_PER_CREDIT_HOUR = 10000;

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
