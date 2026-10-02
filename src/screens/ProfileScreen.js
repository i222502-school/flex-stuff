import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import InfoRow from '../components/InfoRow';
import { student } from '../data/student';
import { getInitials } from '../utils/helpers';
import { colors } from '../theme';

export default function ProfileScreen() {
  const { personal, contact } = student;

  // Rows are built as data, then drawn with .map() below
  const personalRows = [
    { label: 'Date of Birth', value: personal.dob },
    { label: 'Gender', value: personal.gender },
    { label: 'Email', value: personal.email },
    { label: 'Mobile', value: personal.mobile },
    { label: 'Blood Group', value: personal.bloodGroup },
    { label: 'Nationality', value: personal.nationality },
  ];

  const contactRows = [
    { label: 'Current Address', value: contact.currentAddress },
    { label: 'Permanent Address', value: contact.permanentAddress },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(personal.name)}</Text>
        </View>
        <Text style={styles.name}>{personal.name}</Text>
        <Text style={styles.subtitle}>
          {student.rollNo} · {student.degree} · {student.section}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Personal information</Text>
      <Card style={styles.card}>
        {personalRows.map((row, index) => (
          <InfoRow
            key={row.label}
            label={row.label}
            value={row.value}
            isLast={index === personalRows.length - 1}
          />
        ))}
      </Card>

      <Text style={styles.sectionTitle}>Contact information</Text>
      <Card style={styles.card}>
        {contactRows.map((row, index) => (
          <InfoRow
            key={row.label}
            label={row.label}
            value={row.value}
            isLast={index === contactRows.length - 1}
          />
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 8,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.subtext,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  card: {
    paddingVertical: 4,
    marginBottom: 24,
  },
});
