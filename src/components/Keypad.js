import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, type, spacing } from '../theme';

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'back'],
];

export default function Keypad({ onKeyPress }) {
  return (
    <View style={styles.grid}>
      {KEYS.map((row, i) => (
        <View style={styles.row} key={i}>
          {row.map((key) => (
            <Pressable
              key={key}
              onPress={() => onKeyPress(key)}
              style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            >
              {key === 'back' ? (
                <Ionicons name="backspace-outline" size={22} color={colors.textPrimary} />
              ) : (
                <Text style={styles.keyLabel}>{key}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  key: {
    flex: 1,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgElevated,
  },
  keyPressed: {
    backgroundColor: colors.bgCard,
  },
  keyLabel: {
    ...type.h1,
    color: colors.textPrimary,
    fontSize: 22,
  },
});
