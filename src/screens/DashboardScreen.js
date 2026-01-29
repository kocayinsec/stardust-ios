import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
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
  const headerAnim = useRef(new Animated.Value(0)).current;
  const readingsAnim = useRef(new Animated.Value(0)).current;
  const oracleAnim = useRef(new Animated.Value(0)).current;
  const goldAnim = useRef(new Animated.Value(0)).current;
  const cardFloat = useRef(new Animated.Value(0)).current;
  const buttonGlow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(140, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(readingsAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(oracleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(goldAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(cardFloat, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(cardFloat, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonGlow, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(buttonGlow, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    glowLoop.start();

    const arrivalTimeout = setTimeout(() => {
      Haptics.selectionAsync().catch(() => null);
    }, 360);

    return () => {
      floatLoop.stop();
      glowLoop.stop();
      clearTimeout(arrivalTimeout);
    };
  }, [buttonGlow, cardFloat, goldAnim, headerAnim, oracleAnim, readingsAnim]);

  const floatStyle = {
    transform: [
      {
        translateY: cardFloat.interpolate({
          inputRange: [0, 1],
          outputRange: [6, -6],
        }),
      },
    ],
  };

  const glowStyle = {
    opacity: buttonGlow.interpolate({
      inputRange: [0, 1],
      outputRange: [0.25, 0.65],
    }),
    transform: [
      {
        scale: buttonGlow.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1.08],
        }),
      },
    ],
  };

  const entranceStyle = (anim) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  });

  const triggerSelectionHaptic = () => {
    Haptics.selectionAsync().catch(() => null);
  };

  const triggerImpactHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => null);
  };

  const handleOraclePress = () => {
    triggerImpactHaptic();
    navigation.navigate('OracleChat');
  };

  const handleGoldPress = () => {
    triggerImpactHaptic();
  };

  return (
    <LinearGradient
      colors={[colors.midnight, '#0D1230', '#1A0F2E', '#0B1235']}
      style={styles.container}
    >
      <LivingNebula />
      <Starfield density={60} color="rgba(255,255,255,0.75)" />
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={entranceStyle(headerAnim)}>
          <Text style={styles.title}>Galactic Energy</Text>
          <Text style={styles.subtitle}>Your cosmic momentum for today</Text>
          <EnergyMeter level={energy.level} type={energy.type} />
        </Animated.View>

        <Animated.View style={entranceStyle(readingsAnim)}>
          <View style={styles.readingHeader}>
            <Text style={styles.readingTitle}>Daily Readings</Text>
            <Text style={styles.readingSubtitle}>Arcane checkpoints aligned to your orbit</Text>
          </View>
          <View style={styles.readingGrid}>
            {dailyReadings.map((reading) => (
              <Pressable
                key={reading.id}
                onPressIn={triggerSelectionHaptic}
                accessibilityRole="button"
              >
                {({ pressed }) => (
                  <LinearGradient
                    colors={['rgba(111, 88, 206, 0.45)', 'rgba(18, 22, 45, 0.8)']}
                    style={[styles.readingCard, pressed && styles.readingCardPressed]}
                  >
                    <Text style={styles.readingTime}>{reading.time}</Text>
                    <Text style={styles.readingName}>{reading.title}</Text>
                    <Text style={styles.readingDetail}>{reading.detail}</Text>
                  </LinearGradient>
                )}
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[entranceStyle(oracleAnim), floatStyle]}>
          <BlurView intensity={25} tint="dark" style={styles.card}>
            <Text style={styles.cardTitle}>Oracle Whisper</Text>
            <Text style={styles.cardText}>{energy.description}</Text>
            <View style={styles.oracleButtonWrap}>
              <Animated.View pointerEvents="none" style={[styles.oracleButtonGlow, glowStyle]} />
              <Pressable
                style={({ pressed }) => [styles.oracleButton, pressed && styles.buttonPressed]}
                onPress={handleOraclePress}
                onPressIn={triggerSelectionHaptic}
              >
                <Text style={styles.oracleButtonText}>Ask the Oracle</Text>
              </Pressable>
            </View>
          </BlurView>
        </Animated.View>

        <Animated.View style={[entranceStyle(goldAnim), floatStyle]}>
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
            <View style={styles.goldButtonWrap}>
              <Animated.View pointerEvents="none" style={[styles.goldButtonGlow, glowStyle]} />
              <Pressable
                style={({ pressed }) => [styles.goldButton, pressed && styles.goldButtonPressed]}
                onPress={handleGoldPress}
                onPressIn={triggerSelectionHaptic}
              >
                <Text style={styles.goldButtonText}>Unlock Gold</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.ScrollView>
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
    borderColor: 'rgba(255,255,255,0.18)',
    shadowColor: 'rgba(110, 80, 200, 0.55)',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  readingCardPressed: {
    transform: [{ scale: 0.98 }],
    borderColor: 'rgba(255,255,255,0.32)',
    shadowOpacity: 0.6,
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
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(10,14,26,0.65)',
    shadowColor: 'rgba(80, 70, 160, 0.65)',
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
    overflow: 'hidden',
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
  oracleButtonWrap: {
    marginTop: spacing.md,
  },
  oracleButtonGlow: {
    position: 'absolute',
    left: -14,
    right: -14,
    top: -12,
    bottom: -12,
    borderRadius: 16,
    backgroundColor: 'rgba(109, 140, 255, 0.2)',
  },
  oracleButton: {
    backgroundColor: colors.purple,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: 'rgba(120, 140, 255, 0.6)',
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.6,
    borderColor: 'rgba(255,255,255,0.35)',
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
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,226,170,0.4)',
    shadowColor: 'rgba(255, 198, 120, 0.65)',
    shadowOpacity: 0.4,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    overflow: 'hidden',
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
  goldButtonWrap: {
    marginTop: spacing.xs,
  },
  goldButtonGlow: {
    position: 'absolute',
    left: -14,
    right: -14,
    top: -12,
    bottom: -12,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 218, 145, 0.32)',
  },
  goldButton: {
    backgroundColor: colors.gold,
    paddingVertical: spacing.sm,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: 'rgba(255, 214, 140, 0.7)',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  goldButtonPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.65,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  goldButtonText: {
    color: colors.midnight,
    fontWeight: '700',
    letterSpacing: 0.6,
    ...typography.button,
  },
});
