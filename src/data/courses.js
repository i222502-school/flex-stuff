// Every course offered this semester.
// type is 'theory' or 'lab' — credit hours come from CREDIT_HOURS in constants.js.
// Each section has a seat count; 0 seats means the section is full.
export const offeredCourses = [
  {
    code: 'CS3001',
    name: 'Computer Networks',
    type: 'theory',
    sections: [
      { name: 'A', seats: 4 },
      { name: 'B', seats: 0 },
      { name: 'C', seats: 12 },
    ],
  },
  {
    code: 'CL3001',
    name: 'Computer Networks Lab',
    type: 'lab',
    sections: [
      { name: 'A', seats: 2 },
      { name: 'B', seats: 9 },
    ],
  },
  {
    code: 'CS4039',
    name: 'Software for Mobile Devices',
    type: 'theory',
    sections: [
      { name: 'A', seats: 6 },
      { name: 'B', seats: 3 },
    ],
  },
  {
    code: 'CS3009',
    name: 'Software Engineering',
    type: 'theory',
    sections: [
      { name: 'A', seats: 0 },
      { name: 'B', seats: 7 },
    ],
  },
  {
    code: 'CS3006',
    name: 'Parallel & Distributed Computing',
    type: 'theory',
    sections: [
      { name: 'A', seats: 5 },
      { name: 'B', seats: 1 },
    ],
  },
  {
    code: 'CS4045',
    name: 'Deep Learning',
    type: 'theory',
    sections: [
      { name: 'A', seats: 10 },
    ],
  },
  {
    code: 'AI4001',
    name: 'Natural Language Processing',
    type: 'theory',
    sections: [
      { name: 'A', seats: 0 },
      { name: 'B', seats: 8 },
    ],
  },
  {
    code: 'SS3002',
    name: 'Technical & Business Writing',
    type: 'theory',
    sections: [
      { name: 'A', seats: 15 },
      { name: 'B', seats: 11 },
    ],
  },
];

// Courses the student is registered in when the app starts.
// The registration screen will add to / remove from this list (in state).
export const initialRegistrations = [
  { code: 'CS3001', section: 'A' },
  { code: 'CL3001', section: 'B' },
  { code: 'CS4039', section: 'A' },
  { code: 'CS3009', section: 'B' },
  { code: 'CS3006', section: 'A' },
];
