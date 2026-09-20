import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Avatar, Keypad, PrimaryButton } from '../../components';
import { colors, type, spacing, radius } from '../../theme';
import { NETWORK_FEE_USD, formatUSD, formatLocal } from '../../data/mockData';

export default function SendAmountScreen({ navigation, route }) {
  const { contact } = route.params;
  const [amount, setAmount] = useState('0');

  const onKeyPress = (key) => {
    if (key === 'back') {
      setAmount((a) => (a.length > 1 ? a.slice(0, -1) : '0'));
      return;
    }
    if (key === '.') {
      if (amount.includes('.')) return;
      setAmount((a) => `${a}.`);
      return;
    }
    setAmount((a) => {
      if (a === '0') return key;
      const decimals = a.split('.')[1];
      if (decimals && decimals.length >= 2) return a; // max 2 decimal places
      return a + key;
    });
  };

  const numericAmount = parseFloat(amount) || 0;
  const canContinue = numericAmount > 0;
  const theyReceive = useMemo(() => formatLocal(numericAmount, contact), [numericAmount, contact]);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.recipientChip}>
          <Avatar initials={contact.initials} seed={contact.name} size={24} />
          <Text style={styles.recipientChipText}>{contact.name}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.amountArea}>
        <Text style={styles.amountLabel}>You send</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currencySign}>$</Text>
          <Text style={styles.amountText} numberOfLines={1} adjustsFontSizeToFit>
            {amount}
          </Text>
        </View>
        <Text style={styles.receiveText}>
          {contact.name.split(' ')[0]} receives {theyReceive}
        </Text>
      </View>

      <View style={styles.feeBox}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Network fee</Text>
          <Text style={styles.feeValue}>{formatUSD(NETWORK_FEE_USD)}</Text>
        </View>
        <View style={styles.feeRow}>
          <Ionicons name="checkmark-circle" size={14} color={colors.green} />
          <Text style={styles.feeNote}>Only the network fee — no hidden charges, ever</Text>
        </View>
      </View>

      <Keypad onKeyPress={onKeyPress} />

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Review transfer"
        disabled={!canContinue}
        onPress={() =>
          navigation.navigate('SendConfirm', { contact, amount: numericAmount })
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  recipientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recipientChipText: { ...type.caption, color: colors.textPrimary },
  amountArea: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  amountLabel: { ...type.caption, color: colors.textSecondary, marginBottom: spacing.sm },
  amountRow: { flexDirection: 'row', alignItems: 'center' },
  currencySign: { ...type.h1, color: colors.textSecondary, marginRight: 4 },
  amountText: { ...type.amount, color: colors.textPrimary, maxWidth: 260 },
  receiveText: { ...type.caption, color: colors.textSecondary, marginTop: spacing.sm },
  feeBox: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: 8,
  },
  feeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
  feeLabel: { ...type.caption, color: colors.textSecondary },
  feeValue: { ...type.caption, color: colors.textPrimary, fontFamily: 'Poppins-Medium' },
  feeNote: { ...type.small, color: colors.textSecondary, flex: 1 },
});
