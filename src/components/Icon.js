import Svg, { Path } from 'react-native-svg';

// Outline icons drawn with react-native-svg (already installed for the charts).
// Each icon is a list of SVG path strings on a 24x24 grid (shapes from Feather icons).
const icons = {
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M8 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0'],
  book: [
    'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z',
    'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
  ],
  award: ['M5 8a7 7 0 1 0 14 0a7 7 0 1 0-14 0', 'M8.21 13.89L7 23l5-3l5 3l-1.21-9.12'],
  check: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
  receipt: [
    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
    'M14 2v6h6',
    'M16 13H8',
    'M16 17H8',
    'M10 9H8',
  ],
  chart: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
  calendar: [
    'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'M16 2v4',
    'M8 2v4',
    'M3 10h18',
  ],
  search: ['M3 11a8 8 0 1 0 16 0a8 8 0 1 0-16 0', 'M21 21l-4.35-4.35'],
  close: ['M18 6L6 18', 'M6 6l12 12'],
  back: ['M15 18l-6-6l6-6'],
  forward: ['M9 18l6-6l-6-6'],
};

export default function Icon({ name, size = 24, color = '#FFFFFF' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name].map((d) => (
        <Path key={d} d={d} />
      ))}
    </Svg>
  );
}
