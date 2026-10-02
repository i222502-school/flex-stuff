import { View } from 'react-native';

// Small circle in a course's own colour, shown next to its code.
export default function CourseDot({ color, size = 10 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        marginRight: 6,
      }}
    />
  );
}
