import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../constants/theme';
import { useTypography } from '../constants/typography';

export default function EnergyMeter({ level = 72, type = 'Nebula' }) {
  const typography = useTypography();
  const styles = useMemo(() => getStyles(typography), [typography]);
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 16000,
        useNativeDriver: true,
      })
    ).start();
  }, [pulseAnim, rotateAnim]);

  const pulse = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const glow = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.75],
  });

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const segments = 18;
  const activeSegments = Math.max(2, Math.round((level / 100) * segments));
  const segmentData = useMemo(
    () => Array.from({ length: segments }, (_, index) => index),
    [segments]
  );

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.meterShell, { transform: [{ scale: pulse }] }]}>
        <Animated.View
          style={[
            styles.glowRing,
            {
              opacity: glow,
            },
          ]}
        />
        <LinearGradient
          colors={['rgba(129,90,255,0.55)', 'rgba(61,235,255,0.12)', 'rgba(255,214,145,0.45)']}
          style={styles.gradientRing}
        />
        <View style={styles.segmentLayer}>
          {segmentData.map((index) => {
            const isActive = index < activeSegments;
            const angle = (360 / segments) * index;
            return (
              <View
                key={`segment-${index}`}
                style={[
                  styles.segment,
                  {
                    opacity: isActive ? 1 : 0.25,
                    backgroundColor: isActive ? 'rgba(255, 221, 160, 0.9)' : 'rgba(120, 140, 210, 0.4)',
                    shadowColor: isActive ? 'rgba(255, 214, 145, 0.9)' : 'transparent',
                    transform: [{ rotate: `${angle}deg` }, { translateY: -92 }],
                  },
                ]}
              />
            );
          })}
        </View>

        <Animated.View style={[styles.orbit, { transform: [{ rotate: spin }] }]}>
          <View style={styles.orb} />
        </Animated.View>

        <View style={styles.innerCore}>
          <Text style={[styles.energyValue, typography.display]}>{level}%</Text>
          <Text style={[styles.energyType, typography.body]}>{type} Energy</Text>
          <Text style={[styles.energyHint, typography.label]}>Astral charge rising</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const getStyles = (typography) => StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  meterShell: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: 'rgba(140, 115, 255, 0.6)',
    shadowColor: 'rgba(130, 90, 255, 0.9)',
    shadowOpacity: 0.8,
    shadowRadius: 26,
  },
  gradientRing: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  segmentLayer: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segment: {
    position: 'absolute',
    width: 8,
    height: 20,
    borderRadius: 6,
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  orbit: {
    position: 'absolute',
    width: 190,
    height: 190,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  orb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.cyan,
    shadowColor: colors.cyan,
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  innerCore: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12, 14, 32, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  energyValue: {
    fontSize: 38,
    color: colors.gold,
  },
  energyType: {
    marginTop: spacing.xs,
    color: colors.white,
  },
  energyHint: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
});
