import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, spacing } from '../constants/theme';

const energy = {
  type: 'Nebula',
  description: 'Creativity and dream signals are heightened today.',
  level: 74,
};

export default function DashboardScreen() {
  return (
    <LinearGradient
      colors={[colors.midnight, '#0E1222', '#1B0F2C']}
      style={styles.container}
    >
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
  },
  subtitle: {
    color: colors.cyan,
    textAlign: 'center',
    marginBottom: spacing.lg,
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
    borderColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.purple,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  innerRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  energyValue: {
    fontSize: 36,
    color: colors.gold,
    fontWeight: '700',
  },
  energyType: {
    color: colors.white,
    marginTop: spacing.xs,
  },
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(11,15,25,0.6)',
  },
  cardTitle: {
    color: colors.gold,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  cardText: {
    color: colors.white,
    lineHeight: 22,
  },
});
