import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Starfield from '../components/Starfield';
import LivingNebula from '../components/LivingNebula';
import { colors, spacing, typography } from '../constants/theme';

const energy = {
  type: 'Nebula',
  description: 'Creativity and dream signals are heightened today.',
  level: 74,
};

export default function DashboardScreen({ navigation }) {
  return (
    <LinearGradient
      colors={[colors.midnight, '#0D1230', '#1A0F2E', '#0B1235']}
      style={styles.container}
    >
      <LivingNebula />
      <Starfield density={60} color="rgba(255,255,255,0.75)" />
      <Text style={styles.title}>Galactic Energy</Text>
      <Text style={styles.subtitle}>Your cosmic momentum for today</Text>

      <View style={styles.meterWrap}>
        <View style={styles.outerRing}>
          <View style={styles.innerRing}>
            <Text style={styles.energyValue}>{energy.level}%</Text>
            <Text style={styles.energyType}>{energy.type} Energy</Text>
          </View>
        </View>
      </View>

      <BlurView intensity={25} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>Oracle Whisper</Text>
        <Text style={styles.cardText}>{energy.description}</Text>
        <TouchableOpacity
          style={styles.oracleButton}
          onPress={() => navigation.navigate('OracleChat')}
        >
          <Text style={styles.oracleButtonText}>Ask the Oracle</Text>
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
  title: {
    fontSize: 30,
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
  meterWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  outerRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: 'rgba(155, 110, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(130, 90, 255, 0.9)',
    shadowOpacity: 0.55,
    shadowRadius: 24,
  },
  innerRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  energyValue: {
    fontSize: 36,
    color: colors.gold,
    fontWeight: '700',
    ...typography.title,
  },
  energyType: {
    color: colors.white,
    marginTop: spacing.xs,
    ...typography.body,
  },
  card: {
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(10,14,26,0.62)',
    shadowColor: 'rgba(80, 70, 160, 0.6)',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  cardTitle: {
    color: colors.gold,
    fontWeight: '700',
    marginBottom: spacing.xs,
    ...typography.title,
  },
  cardText: {
    color: colors.white,
    lineHeight: 22,
    ...typography.body,
  },
  oracleButton: {
    marginTop: spacing.md,
    backgroundColor: colors.purple,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
  },
  oracleButtonText: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0.6,
    ...typography.body,
  },
});
