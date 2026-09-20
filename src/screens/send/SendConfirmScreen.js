import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Avatar, PrimaryButton, GhostButton } from '../../components';
import { colors, type, spacing, radius } from '../../theme';
import { NETWORK_FEE_USD, formatUSD, formatLocal } from '../../data/mockData';

export default function SendConfirmScreen({ navigation, route }) {
  const { contact, amount } = route.params;
  const [sendTestFirst, setSendTestFirst] = useState(contact.firstTime);
  const [sending, setSending] = useState(false);

  const total = amount + NETWORK_FEE_USD;
  const sendAmount = sendTestFirst ? Math.min(1, amount) : amount;

  const confirmAndSend = () => {
    setSending(true);
    // Simulated settlement — in-network transfers post instantly to the internal
    // ledger; external/cross-border transfers settle on-chain (see PRD section 07).
    setTimeout(() => {
      setSending(false);
      navigation.replace('SendSuccess', {
        contact,
        amount: sendAmount,
        wasTest: sendTestFirst,
      });
    }, 900);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={type.h2}>Confirm transfer</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.scroll}>
        <View style={styles.recipientCard}>
          <Avatar initials={contact.initials} seed={contact.name} size={56} />
          <Text style={styles.verifiedName}>{contact.verifiedName}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.green} />
            <Text style={styles.verifiedText}>Verified recipient · {contact.handle}</Text>
          </View>
        </View>

        {contact.firstTime && (
          <View style={styles.warnBox}>
            <Ionicons name="information-circle-outline" size={18} color={colors.blue} />
            <View style={styles.warnTextWrap}>
              <Text style={styles.warnTitle}>First time sending to {contact.name.split(' ')[0]}</Text>
              <Text style={styles.warnBody}>
                We recommend a small test transfer first. You can still send the full amount
                right now if you're sure.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.summary}>
          <Row label="You send" value={formatUSD(sendAmount)} />
          <Row label="Network fee" value={formatUSD(NETWORK_FEE_USD)} muted />
          <View style={styles.hr} />
          <Row
            label={`${contact.name.split(' ')[0]} receives`}
            value={formatLocal(sendAmount, contact)}
            bold
          />
        </View>

        {contact.firstTime && (
          <Pressable
            style={styles.toggleRow}
            onPress={() => setSendTestFirst((v) => !v)}
          >
            <View style={[styles.checkbox, sendTestFirst && styles.checkboxOn]}>
              {sendTestFirst && <Ionicons name="checkmark" size={13} color={colors.textOnGreen} />}
            </View>
            <Text style={styles.toggleLabel}>Send a small test amount first (recommended)</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label={sendTestFirst ? 'Confirm & send test' : 'Confirm & send now'}
          loading={sending}
          onPress={confirmAndSend}
        />
        <View style={{ height: spacing.sm }} />
        <GhostButton label="Go back and double-check" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

function Row({ label, value, bold, muted }) {
  return (
    <View style={styles.row}>
      <Text style={[type.body, { color: colors.textSecondary }]}>{label}</Text>
      <Text
        style={[
          bold ? type.h3 : type.body,
          { color: muted ? colors.textSecondary : colors.textPrimary },
        ]}
      >
        {value}
      </Text>
    </View>
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
  scroll: { flex: 1, paddingHorizontal: spacing.lg },
  recipientCard: { alignItems: 'center', paddingVertical: spacing.lg },
  verifiedName: { ...type.h2, color: colors.textPrimary, marginTop: spacing.sm },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  verifiedText: { ...type.caption, color: colors.textSecondary },
  warnBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: 'rgba(59,130,246,0.10)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.3)',
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  warnTextWrap: { flex: 1 },
  warnTitle: { ...type.h3, fontSize: 14, color: colors.textPrimary },
  warnBody: { ...type.caption, color: colors.textSecondary, marginTop: 2 },
  summary: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hr: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: 2 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.green, borderColor: colors.green },
  toggleLabel: { ...type.caption, color: colors.textSecondary, flex: 1 },
  actions: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, paddingTop: spacing.md },
});
