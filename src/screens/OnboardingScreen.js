import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import LivingNebula from '../components/LivingNebula';
import ConstellationSigil from '../components/ConstellationSigil';
import CosmicSealReveal from '../components/CosmicSealReveal';
import { colors, spacing } from '../constants/theme';
import { useTypography } from '../constants/typography';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function OnboardingScreen({ navigation }) {
  const typography = useTypography();
  const [activeField, setActiveField] = useState(null);
  const [starSeedId, setStarSeedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const entryOpacity = useRef(new Animated.Value(0)).current;
  const entryTranslate = useRef(new Animated.Value(28)).current;
  const cardTranslate = useRef(new Animated.Value(18)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const revealAnim = useRef(new Animated.Value(0)).current;
  const sigilFloat = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonGlow = useRef(new Animated.Value(0)).current;
  const navTimeout = useRef(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entryOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(entryTranslate, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 700,
        delay: 120,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslate, {
        toValue: 0,
        duration: 700,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(sigilFloat, {
          toValue: 1,
          duration: 4200,
          useNativeDriver: true,
        }),
        Animated.timing(sigilFloat, {
          toValue: 0,
          duration: 4200,
          useNativeDriver: true,
        }),
      ])
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonGlow, {
          toValue: 1,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonGlow, {
          toValue: 0,
          duration: 2800,
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    glowLoop.start();

    return () => {
      floatLoop.stop();
      glowLoop.stop();
      if (navTimeout.current) {
        clearTimeout(navTimeout.current);
      }
    };
  }, [buttonGlow, cardOpacity, cardTranslate, entryOpacity, entryTranslate, sigilFloat]);

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    const nextId = `SS-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()
      .toString()
      .slice(-4)}`;
    setStarSeedId(nextId);
    revealAnim.setValue(0);
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    navTimeout.current = setTimeout(() => {
      setIsGenerating(false);
      navigation.navigate('Dashboard');
    }, 1400);
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 18,
      bounciness: 6,
    }).start();
  };

  const revealStyle = {
    opacity: revealAnim,
    transform: [
      {
        translateY: revealAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0],
        }),
      },
      {
        scale: revealAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  };

  const sigilFloatStyle = {
    transform: [
      {
        translateY: sigilFloat.interpolate({
          inputRange: [0, 1],
          outputRange: [6, -6],
        }),
      },
    ],
  };

  const buttonGlowStyle = {
    opacity: buttonGlow.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.75],
    }),
    transform: [
      {
        scale: buttonGlow.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1.08],
        }),
      },
    ],
  };

  const inputWrapperStyle = (field) => [
    styles.inputWrapper,
    activeField === field && styles.inputWrapperActive,
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05060F', '#0B1436', '#1B0F3D', '#3C165E', '#0E1230']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={StyleSheet.absoluteFillObject}
      />
      <LivingNebula />
      <LinearGradient
        colors={['rgba(255,255,255,0.06)', 'rgba(26,16,70,0.68)', 'rgba(5,6,15,0.92)']}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 0.95 }}
        style={styles.gradientOverlay}
      />
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <Animated.View style={[styles.sigilWrap, sigilFloatStyle]}>
        <ConstellationSigil size={200} tint="rgba(214, 198, 255, 0.9)" />
      </Animated.View>

      <Animated.View
        style={[
          styles.header,
          {
            opacity: entryOpacity,
            transform: [{ translateY: entryTranslate }],
          },
        ]}
      >
        <Text style={styles.title}>Stardust AI</Text>
        <Text style={styles.subtitle}>Reveal your cosmic identity</Text>
        <Text style={styles.helper}>Attune your star map to unlock your oracle.</Text>
        <View style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
      </Animated.View>

      <Animated.View
        style={{
          opacity: cardOpacity,
          transform: [{ translateY: cardTranslate }],
        }}
      >
        <AnimatedBlurView intensity={28} tint="dark" style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <View style={inputWrapperStyle('name')}>
            <BlurView intensity={16} tint="dark" style={styles.inputBlur}>
              <TextInput
                placeholder="Your name"
                placeholderTextColor="#9FA3B2"
                selectionColor={colors.cyan}
                style={styles.input}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
              />
            </BlurView>
          </View>

          <Text style={styles.label}>Birth Date</Text>
          <View style={inputWrapperStyle('date')}>
            <BlurView intensity={16} tint="dark" style={styles.inputBlur}>
              <TextInput
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#9FA3B2"
                selectionColor={colors.cyan}
                style={styles.input}
                onFocus={() => setActiveField('date')}
                onBlur={() => setActiveField(null)}
              />
            </BlurView>
          </View>

          <Text style={styles.label}>Birth Time</Text>
          <View style={inputWrapperStyle('time')}>
            <BlurView intensity={16} tint="dark" style={styles.inputBlur}>
              <TextInput
                placeholder="HH : MM"
                placeholderTextColor="#9FA3B2"
                selectionColor={colors.cyan}
                style={styles.input}
                onFocus={() => setActiveField('time')}
                onBlur={() => setActiveField(null)}
              />
            </BlurView>
          </View>

          <Text style={styles.label}>Birth Location</Text>
          <View style={inputWrapperStyle('location')}>
            <BlurView intensity={16} tint="dark" style={styles.inputBlur}>
              <TextInput
                placeholder="City, Country"
                placeholderTextColor="#9FA3B2"
                selectionColor={colors.cyan}
                style={styles.input}
                onFocus={() => setActiveField('location')}
                onBlur={() => setActiveField(null)}
              />
            </BlurView>
          </View>

          <Animated.View style={[styles.buttonShell, { transform: [{ scale: buttonScale }] }]}>
            <Animated.View style={[styles.buttonGlow, buttonGlowStyle]} />
            <TouchableOpacity
              style={[styles.button, isGenerating && styles.buttonDisabled]}
              onPress={handleGenerate}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#7B2CBF', '#5B4BFF', '#36B6FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonFill}
              >
                <Text style={styles.buttonText}>
                  {isGenerating ? 'Channeling...' : 'Generate Star Seed'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {starSeedId && (
            <Animated.View style={[styles.revealCard, revealStyle]}>
              <CosmicSealReveal progress={revealAnim} />
              <Text style={styles.revealLabel}>Star Seed ID</Text>
              <Text style={styles.revealValue}>{starSeedId}</Text>
            </Animated.View>
          )}
        </AnimatedBlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(120, 78, 255, 0.35)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -140,
    left: -90,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(64, 181, 255, 0.25)',
  },
  sigilWrap: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    opacity: 0.75,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: colors.gold,
    textAlign: 'center',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(255, 215, 180, 0.35)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 18,
    ...typography.display,
  },
  subtitle: {
    color: colors.cyan,
    textAlign: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
    ...typography.subtitle,
  },
  helper: {
    color: 'rgba(235, 238, 255, 0.8)',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    ...typography.body,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.gold,
    shadowColor: 'rgba(255, 215, 160, 0.9)',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  card: {
    borderRadius: 22,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(11,15,25,0.55)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  label: {
    color: colors.gold,
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    ...typography.label,
  },
  inputWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  inputWrapperActive: {
    borderColor: 'rgba(255,215,143,0.65)',
    shadowColor: 'rgba(255,215,143,0.6)',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  inputBlur: {
    borderRadius: 14,
  },
  input: {
    padding: spacing.sm,
    color: colors.white,
    fontSize: 15,
    letterSpacing: 0.4,
    ...typography.body,
  },
  buttonShell: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
  },
  buttonGlow: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: -14,
    bottom: -14,
    borderRadius: 26,
    backgroundColor: 'rgba(110, 160, 255, 0.18)',
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: 'rgba(110, 140, 255, 0.6)',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    width: '100%',
  },
  buttonFill: {
    paddingVertical: spacing.sm + 2,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    ...typography.button,
  },
  revealCard: {
    marginTop: spacing.md,
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(15,18,35,0.6)',
    overflow: 'hidden',
  },
  revealLabel: {
    color: colors.cyan,
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
    ...typography.label,
  },
  revealValue: {
    color: colors.white,
    fontSize: 18,
    letterSpacing: 1.8,
    ...typography.title,
  },
});
