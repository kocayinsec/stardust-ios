import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function LivingNebula() {
  const driftA = useRef(new Animated.Value(0)).current;
  const driftB = useRef(new Animated.Value(0)).current;
  const driftC = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const makeLoop = (anim, duration, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      );

    const loopA = makeLoop(driftA, 18000);
    const loopB = makeLoop(driftB, 22000, 1200);
    const loopC = makeLoop(driftC, 26000, 800);

    loopA.start();
    loopB.start();
    loopC.start();

    return () => {
      loopA.stop();
      loopB.stop();
      loopC.stop();
    };
  }, [driftA, driftB, driftC]);

  const layerStyle = (anim, amplitude, scale = 1.2) => ({
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-amplitude, amplitude],
        }),
      },
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [amplitude, -amplitude],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [scale, scale + 0.04],
        }),
      },
    ],
  });

  return (
    <Animated.View pointerEvents="none" style={styles.container}>
      <AnimatedGradient
        colors={['rgba(124,70,255,0.35)', 'rgba(58,152,255,0.2)', 'rgba(5,8,20,0)']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[styles.layer, styles.layerA, layerStyle(driftA, 26, 1.25)]}
      />
      <AnimatedGradient
        colors={['rgba(255,190,120,0.28)', 'rgba(120,64,255,0.12)', 'rgba(5,8,20,0)']}
        start={{ x: 0.05, y: 0.2 }}
        end={{ x: 0.95, y: 0.85 }}
        style={[styles.layer, styles.layerB, layerStyle(driftB, 34, 1.35)]}
      />
      <AnimatedGradient
        colors={['rgba(64,209,255,0.25)', 'rgba(110,90,255,0.12)', 'rgba(5,8,20,0)']}
        start={{ x: 0.2, y: 0.05 }}
        end={{ x: 0.8, y: 0.95 }}
        style={[styles.layer, styles.layerC, layerStyle(driftC, 42, 1.4)]}
      />
      <Animated.View style={styles.glowHalo} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  layer: {
    position: 'absolute',
    width: width * 1.6,
    height: height * 1.6,
    borderRadius: width,
    opacity: 0.9,
  },
  layerA: {
    top: -height * 0.35,
    left: -width * 0.25,
  },
  layerB: {
    top: -height * 0.2,
    right: -width * 0.3,
  },
  layerC: {
    bottom: -height * 0.35,
    left: -width * 0.3,
  },
  glowHalo: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    top: height * 0.12,
    right: -width * 0.2,
    backgroundColor: 'rgba(130, 90, 255, 0.16)',
    shadowColor: 'rgba(120, 180, 255, 0.6)',
    shadowOpacity: 0.6,
    shadowRadius: 50,
  },
});
