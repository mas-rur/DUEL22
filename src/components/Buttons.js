import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, type, radius, spacing, gradients } from '../theme';

export function PrimaryButton({ label, onPress, disabled, loading, icon }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [{ opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }]}
    >
      <LinearGradient
        colors={gradients.buttonGreen}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primary}
      >
        {loading ? (
          <ActivityIndicator color={colors.textOnGreen} />
        ) : (
          <View style={styles.row}>
            {icon}
            <Text style={styles.primaryLabel}>{label}</Text>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress, icon }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.secondary, { opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={styles.row}>
        {icon}
        <Text style={styles.secondaryLabel}>{label}</Text>
      </View>
    </Pressable>
  );
}

export function GhostButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
      <Text style={styles.ghostLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primary: {
    height: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  primaryLabel: {
    ...type.button,
    color: colors.textOnGreen,
  },
  secondary: {
    height: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.bgElevated,
    paddingHorizontal: spacing.lg,
  },
  secondaryLabel: {
    ...type.button,
    color: colors.textPrimary,
  },
  ghostLabel: {
    ...type.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
