import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientGlow, PrimaryButton, SecondaryButton, GhostButton } from '../../components';
import { colors, type, spacing, radius } from '../../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');

  // NOTE: stubbed for the prototype. Wire up to the real backend:
  // - handleEmailSignIn -> POST /auth/email
  // - handleGoogleSignIn -> Google Identity Services -> backend verifies ID token
  //   server-side, issues DUEL22 session JWT (see PRD section 07).
  const handleEmailSignIn = () => navigation.replace('KYC');
  const handleGoogleSignIn = () => navigation.replace('KYC');

  return (
    <GradientGlow variant="blue" style={styles.flex}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <Text style={styles.wordmark}>DUEL22</Text>
            <Text style={styles.tagline}>Send it. Instantly, everywhere.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <View style={{ height: spacing.md }} />
            <PrimaryButton label="Sign in" onPress={handleEmailSignIn} disabled={!email} />

            <View style={styles.dividerRow}>
              <View style={styles.hr} />
              <Text style={styles.or}>or</Text>
              <View style={styles.hr} />
            </View>

            <SecondaryButton
              label="Continue with Google"
              onPress={handleGoogleSignIn}
              icon={<Ionicons name="logo-google" size={18} color={colors.textPrimary} />}
            />

            <View style={{ height: spacing.sm }} />
            <GhostButton label="Use phone number instead" onPress={() => {}} />
          </View>

          <Text style={styles.footer}>
            New to DUEL22?{' '}
            <Text style={styles.footerLink} onPress={handleEmailSignIn}>
              Create account
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientGlow>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    marginBottom: spacing.xxl,
  },
  wordmark: { ...type.h1, color: colors.textPrimary, letterSpacing: 1 },
  tagline: { ...type.bodyLight, color: colors.textSecondary, marginTop: 6 },
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  label: { ...type.caption, color: colors.textSecondary, marginBottom: spacing.xs },
  input: {
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    ...type.body,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  hr: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  or: { ...type.caption, color: colors.textTertiary },
  footer: {
    ...type.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  footerLink: { color: colors.green, fontFamily: 'Poppins-Medium' },
});
