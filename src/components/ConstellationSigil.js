import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function ConstellationSigil({ size = 190, tint = 'rgba(215, 190, 255, 0.9)' }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 22000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 3600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, rotateAnim]);

  const nodes = useMemo(
    () => [
      { x: 0.2, y: 0.25 },
      { x: 0.45, y: 0.15 },
      { x: 0.7, y: 0.28 },
      { x: 0.62, y: 0.58 },
      { x: 0.32, y: 0.72 },
      { x: 0.15, y: 0.5 },
    ],
    []
  );

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [1, 4],
  ];

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulse = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.05],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ rotate: spin }, { scale: pulse }],
        },
      ]}
    >
      <View style={[styles.ring, { borderColor: tint }]} />
      <View style={[styles.ringInner, { borderColor: 'rgba(255, 255, 255, 0.28)' }]} />
      {connections.map(([startIndex, endIndex], index) => {
        const start = nodes[startIndex];
        const end = nodes[endIndex];
        const startX = start.x * size;
        const startY = start.y * size;
        const endX = end.x * size;
        const endY = end.y * size;
        const length = Math.hypot(endX - startX, endY - startY);
        const angle = Math.atan2(endY - startY, endX - startX);
        return (
          <View
            key={`line-${index}`}
            style={[
              styles.line,
              {
                width: length,
                left: startX,
                top: startY,
                backgroundColor: 'rgba(210, 190, 255, 0.5)',
                transform: [{ rotate: `${angle}rad` }],
              },
            ]}
          />
        );
      })}
      {nodes.map((node, index) => (
        <View
          key={`node-${index}`}
          style={[
            styles.node,
            {
              left: node.x * size - 4,
              top: node.y * size - 4,
              backgroundColor: tint,
              shadowColor: tint,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 1.2,
    shadowColor: 'rgba(180, 150, 255, 0.7)',
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  ringInner: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    borderRadius: 999,
    borderWidth: 0.6,
    borderStyle: 'dashed',
  },
  line: {
    position: 'absolute',
    height: 1,
    opacity: 0.6,
  },
  node: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});
