// Marks uploaded so far, keyed by course code.
// `type` must match a key in MARK_WEIGHTS (constants.js).
// Assessments that haven't happened yet are simply not in the list.
// A course with no entry here has no marks uploaded yet.
export const marks = {
  CS3001: [
    { type: 'Quiz', title: 'Quiz 1', obtained: 8, total: 10 },
    { type: 'Quiz', title: 'Quiz 2', obtained: 6, total: 10 },
    { type: 'Quiz', title: 'Quiz 3', obtained: 9, total: 10 },
    { type: 'Assignment', title: 'Assignment 1', obtained: 18, total: 20 },
    { type: 'Assignment', title: 'Assignment 2', obtained: 15, total: 20 },
    { type: 'Sessional 1', title: 'Sessional 1', obtained: 38, total: 50 },
  ],
  CL3001: [
    { type: 'Lab Task', title: 'Lab Task 1', obtained: 10, total: 10 },
    { type: 'Lab Task', title: 'Lab Task 2', obtained: 9, total: 10 },
    { type: 'Lab Task', title: 'Lab Task 3', obtained: 7, total: 10 },
    { type: 'Lab Task', title: 'Lab Task 4', obtained: 10, total: 10 },
  ],
  CS4039: [
    { type: 'Quiz', title: 'Quiz 1', obtained: 10, total: 10 },
    { type: 'Quiz', title: 'Quiz 2', obtained: 9, total: 10 },
    { type: 'Assignment', title: 'Assignment 1', obtained: 25, total: 25 },
    { type: 'Sessional 1', title: 'Sessional 1', obtained: 44, total: 50 },
  ],
  CS3009: [
    { type: 'Quiz', title: 'Quiz 1', obtained: 5, total: 10 },
    { type: 'Quiz', title: 'Quiz 2', obtained: 7, total: 10 },
    { type: 'Assignment', title: 'Assignment 1', obtained: 12, total: 20 },
    { type: 'Sessional 1', title: 'Sessional 1', obtained: 29, total: 50 },
  ],
  CS3006: [
    { type: 'Quiz', title: 'Quiz 1', obtained: 4, total: 10 },
    { type: 'Quiz', title: 'Quiz 2', obtained: 6, total: 10 },
    { type: 'Sessional 1', title: 'Sessional 1', obtained: 22, total: 50 },
  ],
};
