import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, PrimaryButton } from '../../components';
import { colors, type, spacing, radius } from '../../theme';

const ITEMS = [
  {
    icon: 'camera-outline',
    title: 'Camera access',
    body: 'Scan your government ID and take a quick selfie to verify it\u2019s really you.',
  },
  {
    icon: 'notifications-outline',
    title: 'Notifications',
    body: 'Get alerts the moment money arrives, or if a transfer needs your attention.',
  },
];

export default function KYCPermissionScreen({ navigation }) {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons name="shield-checkmark" size={34} color={colors.green} />
        </View>
        <Text style={styles.title}>Verify your identity</Text>
        <Text style={styles.subtitle}>
          Required once, before your first transfer — keeps DUEL22 safe for everyone.
        </Text>

        <View style={styles.list}>
          {ITEMS.map((it) => (
            <View style={styles.row} key={it.title}>
              <View style={styles.rowIcon}>
                <Ionicons name={it.icon} size={20} color={colors.textPrimary} />
              </View>
              <View style={styles.rowText}>
                <Text style={type.h3}>{it.title}</Text>
                <Text style={styles.rowBody}>{it.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.noteBox}>
          <Ionicons name="lock-closed-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.noteText}>
            Your ID photo is encrypted and used only for verification. DUEL22 never shows you a
            wallet address or seed phrase — there's nothing to lose.
          </Text>
        </View>

        <View style={styles.spacer} />
        <PrimaryButton label="Continue" onPress={() => navigation.replace('Main')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: 'rgba(23,217,163,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    alignSelf: 'center',
  },
  title: { ...type.h1, color: colors.textPrimary, textAlign: 'center' },
  subtitle: {
    ...type.bodyLight,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  list: { gap: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  rowIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1 },
  rowBody: { ...type.caption, color: colors.textSecondary, marginTop: 2 },
  noteBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.xl,
  },
  noteText: { ...type.caption, color: colors.textSecondary, flex: 1 },
  spacer: { flex: 1, minHeight: spacing.lg },
});
