import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DEFAULT_DENSITY = 40;

export default function Starfield({ density = DEFAULT_DENSITY, color = 'rgba(255,255,255,0.8)' }) {
  const stars = useMemo(() => {
    return Array.from({ length: density }).map((_, index) => {
      const size = Math.random() * 2 + 1;
      return {
        id: `star-${index}`,
        size,
        left: Math.random() * width,
        top: Math.random() * height,
        baseOpacity: Math.random() * 0.5 + 0.2,
        twinkleDuration: Math.random() * 3000 + 2500,
        delay: Math.random() * 2000,
      };
    });
  }, [density]);

  const opacities = useRef(stars.map((star) => new Animated.Value(star.baseOpacity))).current;

  useEffect(() => {
    const animations = opacities.map((opacity, index) => {
      const star = stars[index];
      return Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: Math.min(1, star.baseOpacity + 0.4),
            duration: star.twinkleDuration,
            delay: star.delay,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: star.baseOpacity,
            duration: star.twinkleDuration,
            useNativeDriver: true,
          }),
        ])
      );
    });

    animations.forEach((animation) => animation.start());

    return () => animations.forEach((animation) => animation.stop());
  }, [opacities, stars]);

  return (
    <Animated.View style={styles.container} pointerEvents="none">
      {stars.map((star, index) => (
        <Animated.View
          key={star.id}
          style={[
            styles.star,
            {
              backgroundColor: color,
              width: star.size,
              height: star.size,
              borderRadius: star.size,
              left: star.left,
              top: star.top,
              opacity: opacities[index],
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
  },
});
