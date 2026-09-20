import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

// A single, deliberate glow — used once per screen (hero balance, onboarding,
// success states), never scattered across every card. Approximates a radial
// glow with a diagonal linear gradient, which is what LinearGradient supports.
export default function GradientGlow({ variant = 'blue', style, children }) {
  const stops =
    variant === 'green'
      ? [colors.greenDim, colors.bg, colors.bg]
      : variant === 'success'
      ? ['#0E9E78', colors.bg, colors.bg]
      : [colors.navy, colors.bg, colors.bg];

  return (
    <LinearGradient
      colors={stops}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 0.8 }}
      style={[styles.fill, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
