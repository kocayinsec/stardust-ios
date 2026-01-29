import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Starfield from '../components/Starfield';
import LivingNebula from '../components/LivingNebula';
import EnergyMeter from '../components/EnergyMeter';
import { colors, spacing } from '../constants/theme';
import { useTypography } from '../constants/typography';

const energy = {
  type: 'Nebula',
  description: 'Creativity and dream signals are heightened today.',
  level: 74,
};

const dailyReadings = [
  {
    id: 'dawn',
    title: 'Dawn Sigil',
    time: 'Sunrise',
    detail: 'Open portals for fresh ideas and soft reinvention.',
  },
  {
    id: 'zenith',
    title: 'Zenith Pulse',
    time: 'Midday',
    detail: 'Momentum peaks—lock in the task that moves destiny.',
  },
  {
    id: 'veil',
    title: 'Veilfall Rite',
    time: 'Evening',
    detail: 'Release weight, recalibrate, and protect your aura.',
  },
];

export default function DashboardScreen({ navigation }) {
  const typography = useTypography();

  return (
    <LinearGradient
      colors={[colors.midnight, '#0D1230', '#1A0F2E', '#0B1235']}
      style={styles.container}
    >
      <LivingNebula />
      <Starfield density={60} color="rgba(255,255,255,0.75)" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Galactic Energy</Text>
        <Text style={styles.subtitle}>Your cosmic momentum for today</Text>

        <EnergyMeter level={energy.level} type={energy.type} />

        <View style={styles.readingHeader}>
          <Text style={styles.readingTitle}>Daily Readings</Text>
          <Text style={styles.readingSubtitle}>Arcane checkpoints aligned to your orbit</Text>
        </View>
        <View style={styles.readingGrid}>
          {dailyReadings.map((reading) => (
            <LinearGradient
              key={reading.id}
              colors={['rgba(111, 88, 206, 0.45)', 'rgba(18, 22, 45, 0.8)']}
              style={styles.readingCard}
            >
              <Text style={styles.readingTime}>{reading.time}</Text>
              <Text style={styles.readingName}>{reading.title}</Text>
              <Text style={styles.readingDetail}>{reading.detail}</Text>
            </LinearGradient>
          ))}
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

        <LinearGradient
          colors={['rgba(255,214,145,0.32)', 'rgba(255,171,82,0.18)', 'rgba(71,22,109,0.64)']}
          style={styles.goldCard}
        >
          <View style={styles.goldBadge}>
            <Text style={styles.goldBadgeText}>STARDUST GOLD</Text>
          </View>
          <Text style={styles.goldTitle}>Ascend to Premium Rituals</Text>
          <Text style={styles.goldSubtitle}>Private forecasts, deeper prophecies, and elite cosmic perks.</Text>
          <View style={styles.goldPerks}>
            <Text style={styles.goldPerkItem}>• Daily destiny readings + custom sigils</Text>
            <Text style={styles.goldPerkItem}>• Priority Oracle sessions (instant replies)</Text>
            <Text style={styles.goldPerkItem}>• Monthly astral gifts + rewards</Text>
          </View>
          <View style={styles.goldPriceRow}>
            <Text style={styles.goldPrice}>$19</Text>
            <Text style={styles.goldPriceDetail}>/month · Cancel anytime</Text>
          </View>
          <TouchableOpacity style={styles.goldButton}>
            <Text style={styles.goldButtonText}>Unlock Gold</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.gold,
    textAlign: 'center',
    marginBottom: spacing.xs,
    ...typography.display,
  },
  subtitle: {
    color: colors.cyan,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontSize: 16,
    ...typography.subtitle,
  },
  readingHeader: {
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  readingTitle: {
    color: colors.gold,
    fontSize: 20,
    fontWeight: '700',
    ...typography.title,
  },
  readingSubtitle: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    ...typography.body,
  },
  readingGrid: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  readingCard: {
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    shadowColor: 'rgba(110, 80, 200, 0.5)',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  readingTime: {
    color: 'rgba(180, 200, 255, 0.9)',
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    ...typography.label,
  },
  readingName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.xs,
    ...typography.title,
  },
  readingDetail: {
    marginTop: spacing.xs,
    color: 'rgba(255,255,255,0.78)',
    lineHeight: 20,
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
    ...typography.button,
  },
  goldCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,226,170,0.35)',
    shadowColor: 'rgba(255, 198, 120, 0.6)',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
  },
  goldBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 215, 120, 0.22)',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 226, 170, 0.5)',
    marginBottom: spacing.sm,
  },
  goldBadgeText: {
    color: colors.gold,
    fontSize: 12,
    letterSpacing: 1.4,
    fontWeight: '700',
    ...typography.label,
  },
  goldTitle: {
    color: colors.gold,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.xs,
    ...typography.title,
  },
  goldSubtitle: {
    color: colors.white,
    marginBottom: spacing.sm,
    lineHeight: 22,
    ...typography.body,
  },
  goldPerks: {
    marginBottom: spacing.md,
  },
  goldPerkItem: {
    color: 'rgba(255,255,255,0.88)',
    marginBottom: 6,
    ...typography.body,
  },
  goldPriceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  goldPrice: {
    color: colors.gold,
    fontSize: 28,
    fontWeight: '700',
    marginRight: spacing.xs,
    ...typography.title,
  },
  goldPriceDetail: {
    color: 'rgba(255,255,255,0.72)',
    ...typography.body,
  },
  goldButton: {
    backgroundColor: colors.gold,
    paddingVertical: spacing.sm,
    borderRadius: 14,
    alignItems: 'center',
  },
  goldButtonText: {
    color: colors.midnight,
    fontWeight: '700',
    letterSpacing: 0.6,
    ...typography.button,
  },
});
