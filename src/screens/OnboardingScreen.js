import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, spacing, typography } from '../constants/theme';

export default function OnboardingScreen({ navigation }) {
  return (
    <LinearGradient
      colors={[colors.midnight, '#12162A', colors.purple]}
      style={styles.container}
    >
      <View style={styles.starfield} />
      <Text style={styles.title}>Stardust AI</Text>
      <Text style={styles.subtitle}>Reveal your cosmic identity</Text>

      <BlurView intensity={30} tint="dark" style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput placeholder="Your name" placeholderTextColor="#9FA3B2" style={styles.input} />

        <Text style={styles.label}>Birth Date</Text>
        <TextInput placeholder="DD / MM / YYYY" placeholderTextColor="#9FA3B2" style={styles.input} />

        <Text style={styles.label}>Birth Time</Text>
        <TextInput placeholder="HH : MM" placeholderTextColor="#9FA3B2" style={styles.input} />

        <Text style={styles.label}>Birth Location</Text>
        <TextInput placeholder="City, Country" placeholderTextColor="#9FA3B2" style={styles.input} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.buttonText}>Generate Star Seed</Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  starfield: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
    backgroundColor: '#0A0E1A',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.gold,
    textAlign: 'center',
    marginBottom: spacing.xs,
    ...typography.title,
  },
  subtitle: {
    color: colors.cyan,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontSize: 16,
    ...typography.body,
  },
  card: {
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(11,15,25,0.6)',
  },
  label: {
    color: colors.gold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    ...typography.body,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    padding: spacing.sm,
    color: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: spacing.sm,
    ...typography.body,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.purple,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.purple,
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0.6,
    ...typography.body,
  },
});
