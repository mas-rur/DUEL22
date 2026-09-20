import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import StatusPill from './StatusPill';
import { colors, type, spacing } from '../theme';
import { formatUSD } from '../data/mockData';

function directionIcon(tx) {
  if (tx.type === 'receive' || tx.type === 'cash_in') {
    return <Ionicons name="arrow-down" size={12} color={colors.success} />;
  }
  return <Ionicons name="arrow-up" size={12} color={colors.textSecondary} />;
}

export default function TransactionRow({ tx, onPress }) {
  const isCredit = tx.type === 'receive' || tx.type === 'cash_in';
  const date = new Date(tx.date);
  const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <View style={styles.row}>
      <Avatar initials={tx.initials} seed={tx.name} size={44} />
      <View style={styles.middle}>
        <Text style={type.h3} numberOfLines={1}>
          {tx.name}
        </Text>
        <View style={styles.subRow}>
          {directionIcon(tx)}
          <Text style={[type.caption, { color: colors.textSecondary }]}>{dateLabel}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text
          style={[
            type.h3,
            { color: isCredit ? colors.success : colors.textPrimary },
          ]}
        >
          {isCredit ? '+' : '\u2212'}
          {formatUSD(tx.amountUSD)}
        </Text>
        <StatusPill status={tx.status} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  middle: {
    flex: 1,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
});
