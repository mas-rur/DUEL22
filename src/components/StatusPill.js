import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, type, radius } from '../theme';

const CONFIG = {
  completed: { label: 'Completed', color: colors.success },
  pending: { label: 'Pending', color: colors.pending },
  cooling_off: { label: 'Cooling-off', color: colors.blue },
  disputed: { label: 'Disputed', color: colors.error },
};

export default function StatusPill({ status }) {
  const cfg = CONFIG[status] || CONFIG.completed;
  return (
    <View style={[styles.pill, { backgroundColor: `${cfg.color}22` }]}>
      <View style={[styles.dot, { backgroundColor: cfg.color }]} />
      <Text style={[type.small, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
