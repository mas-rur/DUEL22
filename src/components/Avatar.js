import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, type } from '../theme';

const PALETTE = ['#3B82F6', '#17D9A3', '#F2994A', '#BB86FC', '#F2C94C'];

function colorFor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export default function Avatar({ initials, size = 48, seed }) {
  const bg = colorFor(seed || initials || '?');
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: `${bg}33` },
      ]}
    >
      <Text style={[type.h3, { color: bg, fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
