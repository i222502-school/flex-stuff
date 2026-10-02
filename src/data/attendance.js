// Attendance records keyed by course code.
// status: 'P' = Present, 'L' = Late (counts as present), 'A' = Absent
// Each class is HOURS_PER_CLASS (1.5) hours — see constants.js.
// A course with no entry here has no classes marked yet.
export const attendance = {
  // Mon / Wed
  CS3001: [
    { date: '2026-08-17', status: 'P' },
    { date: '2026-08-19', status: 'P' },
    { date: '2026-08-24', status: 'L' },
    { date: '2026-08-26', status: 'P' },
    { date: '2026-08-31', status: 'P' },
    { date: '2026-09-02', status: 'A' },
    { date: '2026-09-07', status: 'P' },
    { date: '2026-09-09', status: 'P' },
    { date: '2026-09-14', status: 'P' },
    { date: '2026-09-16', status: 'L' },
    { date: '2026-09-21', status: 'P' },
    { date: '2026-09-23', status: 'P' },
    { date: '2026-09-28', status: 'P' },
    { date: '2026-09-30', status: 'P' },
  ],
  // Fri (one lab per week)
  CL3001: [
    { date: '2026-08-21', status: 'P' },
    { date: '2026-08-28', status: 'P' },
    { date: '2026-09-04', status: 'P' },
    { date: '2026-09-11', status: 'A' },
    { date: '2026-09-18', status: 'P' },
    { date: '2026-09-25', status: 'P' },
    { date: '2026-10-02', status: 'P' },
  ],
  // Tue / Thu
  CS4039: [
    { date: '2026-08-18', status: 'P' },
    { date: '2026-08-20', status: 'P' },
    { date: '2026-08-25', status: 'P' },
    { date: '2026-08-27', status: 'P' },
    { date: '2026-09-01', status: 'P' },
    { date: '2026-09-03', status: 'L' },
    { date: '2026-09-08', status: 'P' },
    { date: '2026-09-10', status: 'P' },
    { date: '2026-09-15', status: 'P' },
    { date: '2026-09-17', status: 'P' },
    { date: '2026-09-22', status: 'P' },
    { date: '2026-09-24', status: 'P' },
    { date: '2026-09-29', status: 'P' },
    { date: '2026-10-01', status: 'P' },
  ],
  // Mon / Wed — borderline (exactly at the threshold)
  CS3009: [
    { date: '2026-08-17', status: 'P' },
    { date: '2026-08-19', status: 'A' },
    { date: '2026-08-24', status: 'P' },
    { date: '2026-08-26', status: 'P' },
    { date: '2026-08-31', status: 'P' },
    { date: '2026-09-02', status: 'P' },
    { date: '2026-09-07', status: 'A' },
    { date: '2026-09-09', status: 'P' },
    { date: '2026-09-14', status: 'L' },
    { date: '2026-09-16', status: 'P' },
  ],
  // Tue / Thu — below the threshold
  CS3006: [
    { date: '2026-08-18', status: 'P' },
    { date: '2026-08-20', status: 'A' },
    { date: '2026-08-25', status: 'P' },
    { date: '2026-08-27', status: 'A' },
    { date: '2026-09-01', status: 'P' },
    { date: '2026-09-03', status: 'P' },
    { date: '2026-09-08', status: 'A' },
    { date: '2026-09-10', status: 'L' },
    { date: '2026-09-15', status: 'P' },
    { date: '2026-09-17', status: 'A' },
    { date: '2026-09-22', status: 'P' },
    { date: '2026-09-24', status: 'P' },
    { date: '2026-09-29', status: 'P' },
    { date: '2026-10-01', status: 'P' },
  ],
};
