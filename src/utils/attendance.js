import { ATTENDANCE_THRESHOLD, HOURS_PER_CLASS } from '../constants';

// 1 -> '1 class', 3 -> '3 classes'
function classText(count) {
  return count === 1 ? '1 class' : `${count} classes`;
}

// Works out everything the attendance screen needs from a course's records.
// Late ('L') counts as present; only 'A' is an absence.
export function getAttendanceSummary(records) {
  const total = records.length;
  const absent = records.filter((r) => r.status === 'A').length;
  const late = records.filter((r) => r.status === 'L').length;
  const attended = total - absent;
  const percent = total > 0 ? (attended / total) * 100 : null;

  let status = 'none';
  let message = 'No classes recorded yet';

  if (total > 0 && percent < ATTENDANCE_THRESHOLD) {
    // Smallest n where (attended + n) / (total + n) reaches the threshold
    const needed = Math.ceil(
      (ATTENDANCE_THRESHOLD * total - 100 * attended) / (100 - ATTENDANCE_THRESHOLD)
    );
    status = 'short';
    message = `Attend the next ${classText(needed)} to get back to ${ATTENDANCE_THRESHOLD}%`;
  } else if (total > 0) {
    // Largest k where attended / (total + k) stays at or above the threshold
    const canMiss = Math.floor((100 * attended) / ATTENDANCE_THRESHOLD - total);
    if (canMiss === 0) {
      status = 'risk';
      message = "You can't miss any more classes";
    } else if (canMiss === 1) {
      status = 'risk';
      message = 'You can miss only 1 more class';
    } else {
      status = 'safe';
      message = `You can miss ${classText(canMiss)}`;
    }
  }

  return {
    total,
    attended,
    absent,
    late,
    percent,
    attendedHours: attended * HOURS_PER_CLASS,
    totalHours: total * HOURS_PER_CLASS,
    status,
    message,
  };
}
