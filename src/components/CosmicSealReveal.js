import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function CosmicSealReveal({ progress }) {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 14000,
        useNativeDriver: true,
      })
    ).start();

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
  }, [pulseAnim, spinAnim]);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  const glowPulse = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          opacity: progress,
          transform: [{ scale }],
        },
      ]}
    >
      <Animated.View style={[styles.ring, { transform: [{ rotate }] }]} />
      <Animated.View
        style={[
          styles.ringGlow,
          {
            opacity: glowPulse,
            transform: [{ rotate }, { scale: glowPulse }],
          },
        ]}
      />
      <Animated.View style={[styles.ringInner, { transform: [{ rotate }] }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 220, 160, 0.55)',
  },
  ringGlow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(128, 210, 255, 0.5)',
    shadowColor: 'rgba(120, 180, 255, 0.8)',
    shadowOpacity: 0.6,
    shadowRadius: 18,
  },
  ringInner: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
});
