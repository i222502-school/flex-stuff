const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "Talha Aamir" -> "TA"
export function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
}

// Today's date as 'YYYY-MM-DD' (same format as the data, so strings can be compared)
export function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

// '2026-08-14' -> '14 Aug'
export function formatDate(dateString) {
  const [, month, day] = dateString.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]}`;
}

// Number of whole days from one 'YYYY-MM-DD' date to another
export function daysBetween(from, to) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((new Date(to) - new Date(from)) / msPerDay);
}

// 1 -> '1 day', 5 -> '5 days'
function dayText(count) {
  return count === 1 ? '1 day' : `${count} days`;
}

// Returns a copy of a calendar event with `status` and a small `hint` added.
// Dates are 'YYYY-MM-DD' strings, so < and > compare them correctly.
export function getEventStatus(event, today) {
  if (!event.start) {
    return { ...event, status: 'TBA', hint: '' };
  }
  if (today < event.start) {
    return { ...event, status: 'Upcoming', hint: `Starts in ${dayText(daysBetween(today, event.start))}` };
  }
  if (today > event.end) {
    return { ...event, status: 'Ended', hint: '' };
  }
  const daysLeft = daysBetween(today, event.end);
  return { ...event, status: 'Ongoing', hint: daysLeft === 0 ? 'Ends today' : `Ends in ${dayText(daysLeft)}` };
}
