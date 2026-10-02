# FLEX Portal: a student portal that warns you early

A React Native (Expo) remake of the FAST FLEX student portal, styled like Spotify's dark theme.

## The problem

FLEX shows raw numbers but never explains them. Students have to work out for themselves:

- how many more classes they can miss before dropping below 80% attendance,
- what they need in the remaining assessments to reach a grade,
- whether their fee challan still matches their courses after an add or drop.

Most students find out about a problem when it is already too late.

## The solution

The app keeps all of the student's data in one place and **does those calculations for them**. Every screen turns its numbers into clear messages and warnings. A **"Needs attention"** list, shown on Home and on the Dashboard, collects every problem across attendance, marks and fees. Each warning opens the screen that fixes it.

## Features

| Screen | What it does |
|---|---|
| **Home** | Greeting that changes with the time of day, profile card, "N things need attention" banner, menu tiles, and the academic calendar with **Ongoing / Upcoming / Ended / TBA** status and "Ends in X days" hints |
| **Profile** | Personal and contact information |
| **Registration** | Search by code or name, filter (All / Registered / Not registered), choose a section, register, switch section or drop. Full sections are disabled, the **18 credit-hour limit** is enforced, dropping asks for confirmation, and a toast confirms each action |
| **Marks** | Course picker, weighted marks and grade estimate, assessments grouped by type, and a **What-if calculator** (validated input) that shows the projected grade and the % needed for an A, B or C |
| **Attendance** | Hours (1.5 hrs per class) and %, an 80% threshold marker, "You can miss N classes" / "Attend the next N classes" messages, courses sorted by risk, an At-risk filter, and **mark today's class** or tap a record to change it |
| **Fee Challan** | Per-course breakdown (credit hours × rate), challan generation (ID, issue and due date), mark as paid, and a warning when registration changes after the challan was generated |
| **Dashboard** | Stat tiles, the Needs-attention list, and 4 charts from **react-native-chart-kit**: ProgressChart (attendance per course), LineChart (weekly attendance trend vs the 80% minimum), BarChart (marks per course), PieChart (fee split) |

Every screen reads the same state, so changing data updates the whole app. Registering a course, marking an absence or generating a challan immediately changes the warnings, the charts and the fee.

## How the assignment requirements are met

| Requirement | Where |
|---|---|
| No navigation library, no side or bottom bars | `App.js`: a `view` state and conditional rendering switch screens. The Android back button returns to Home (`BackHandler`) |
| Components, props, state, events | `src/components/` (21 reusable components). Shared state lives in `App.js` and is passed down as props |
| Data-driven UI | Every list is drawn with `.map()` from arrays and objects in `src/data/` |
| Array methods and calculations | `src/utils/`: `filter`, `map`, `reduce`, `find`, `some`, `sort`, `flatMap` |
| Form and validation | Marks What-if `TextInput` (`keyboardType="numeric"`, `maxLength`, range check and error message) and the registration search and section rules |
| Application states | Empty states on every screen, no marks yet, no classes yet, full sections, credit limit, outdated or overdue challan |
| Dashboard with 2+ chart types | `src/screens/DashboardScreen.js` uses 4 chart types |

## Project structure

```
App.js                 view switching + shared state (registrations, attendance, challan)
src/
  constants.js         every rule in one place (threshold, credit limit, fee rate, weights, grades)
  theme.js             colours
  data/                static data: student, calendar, courses, marks, attendance, menu
  utils/               calculations (no UI): attendance, marks, fees, courses, insights, dashboard, helpers
  components/          reusable UI: Card, Badge, PillButton, SearchBar, FilterPills, ProgressBar, Icon, ...
  screens/             one file per screen
```

Calculations are kept apart from the UI. Screens call functions in `utils/` and only decide how to show the result.

## Quick changes (all in `src/constants.js`)

| Change | Edit |
|---|---|
| Attendance threshold | `ATTENDANCE_THRESHOLD = 80` |
| Hours per class | `HOURS_PER_CLASS = 1.5` |
| Credit hour limit | `MAX_CREDIT_HOURS = 18` |
| Fee rate | `FEE_PER_CREDIT_HOUR = 10000` |
| Low-marks warning | `LOW_MARKS_PERCENT = 60` |
| Grade boundaries / mark weights | `GRADE_SCALE`, `MARK_WEIGHTS` |

To add a course, add it to `offeredCourses` in `src/data/courses.js`. Add marks or attendance under its code in `marks.js` or `attendance.js`.

## Setup and run

Requirements: Node.js 18+ and the **Expo Go** app on an Android or iOS phone.

```bash
git clone <repo-url>
cd flex-portal
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). The phone and the computer must be on the same Wi-Fi network; otherwise use `npx expo start --tunnel`. Press `w` to open the app in a browser instead (the drop-course confirmation dialog only works on a phone).

## Libraries

- `react-native-chart-kit` (+ `react-native-svg`): dashboard charts. The icons are also drawn with `react-native-svg`, so no icon package is needed.
- Everything else uses components that come with React Native.

## Screenshots

_Add screenshots or a demo video link here._

## AI usage

See [AI_USAGE_REPORT.md](AI_USAGE_REPORT.md).
