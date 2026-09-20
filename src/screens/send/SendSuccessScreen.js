import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientGlow, PrimaryButton, GhostButton } from '../../components';
import { colors, type, spacing } from '../../theme';
import { formatUSD, formatLocal } from '../../data/mockData';

export default function SendSuccessScreen({ navigation, route }) {
  const { contact, amount, wasTest } = route.params;
  const firstName = contact.name.split(' ')[0];

  return (
    <GradientGlow variant="success" style={styles.flex}>
      <View style={styles.center}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={44} color={colors.textOnGreen} />
        </View>
        <Text style={styles.title}>{wasTest ? 'Test transfer sent' : 'Sent!'}</Text>
        <Text style={styles.body}>
          {firstName} will receive {formatLocal(amount, contact)}
          {'\n'}(≈ {formatUSD(amount)}) in about 10 seconds.
        </Text>

        <View style={styles.receipt}>
          <Row label="Amount" value={formatUSD(amount)} />
          <Row label="Status" value="Completed" />
          <Row label="Reference" value={`DUEL-${Math.floor(Math.random() * 900000 + 100000)}`} />
        </View>

        {wasTest && (
          <Text style={styles.testNote}>
            Looks good? You can send the full amount to {firstName} next time without the test
            step.
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="Done"
          onPress={() => navigation.navigate('Main', { screen: 'HomeTab' })}
        />
        <View style={{ height: spacing.sm }} />
        <GhostButton label="View receipt" onPress={() => {}} />
      </View>
    </GradientGlow>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { ...type.h1, color: colors.textPrimary },
  body: {
    ...type.bodyLight,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  receipt: {
    width: '100%',
    backgroundColor: colors.bgElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { ...type.caption, color: colors.textSecondary },
  rowValue: { ...type.caption, color: colors.textPrimary, fontFamily: 'Poppins-Medium' },
  testNote: {
    ...type.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  actions: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
