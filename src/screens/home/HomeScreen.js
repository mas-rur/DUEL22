import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer, TransactionRow, AnimatedCounter, NotificationBell } from '../../components';
import { colors, type, spacing, radius, gradients } from '../../theme';
import { currentUser, wallet, transactions } from '../../data/mockData';

const ACTIONS = [
  { key: 'send', icon: 'arrow-up-circle', label: 'Send' },
  { key: 'request', icon: 'arrow-down-circle', label: 'Request' },
  { key: 'add', icon: 'add-circle', label: 'Add money' },
  { key: 'cashout', icon: 'wallet', label: 'Cash out' },
];

export default function HomeScreen({ navigation }) {
  const [hidden, setHidden] = useState(false);

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greetLabel}>Welcome back</Text>
            <Text style={type.h2}>{currentUser.name.split(' ')[0]}</Text>
          </View>
          <NotificationBell hasUnread onPress={() => {}} />
        </View>

        <LinearGradient
          colors={gradients.heroGlow}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.balanceCard}
        >
          <View style={styles.balanceTopRow}>
            <Text style={styles.balanceLabel}>Total balance</Text>
            <Pressable onPress={() => setHidden((h) => !h)}>
              <Ionicons
                name={hidden ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
          {hidden ? (
            <Text style={styles.balanceAmount}>{'\u2022\u2022\u2022\u2022\u2022\u2022'}</Text>
          ) : (
            <AnimatedCounter
              value={wallet.balanceUSD}
              prefix="$"
              decimals={2}
              style={styles.balanceAmount}
            />
          )}
          <Text style={styles.balanceSub}>
            {hidden ? ' ' : `\u2248 ${wallet.balanceUSDC.toLocaleString('en-US', { maximumFractionDigits: 2 })} USDC`}
          </Text>
        </LinearGradient>

        <View style={styles.actionsRow}>
          {ACTIONS.map((a) => (
            <Pressable
              key={a.key}
              style={styles.actionItem}
              onPress={() => a.key === 'send' && navigation.navigate('SendFlow')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={a.icon} size={22} color={colors.green} />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={type.h3}>Recent activity</Text>
          <Pressable onPress={() => navigation.navigate('Activity')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View>
          {transactions.slice(0, 4).map((tx) => (
            <TransactionRow tx={tx} key={tx.id} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    marginBottom: spacing.lg,
  },
  greetLabel: { ...type.caption, color: colors.textSecondary },
  balanceCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  balanceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: { ...type.caption, color: colors.textSecondary },
  balanceAmount: { ...type.amount, color: colors.textPrimary, marginTop: spacing.sm },
  balanceSub: { ...type.caption, color: colors.textSecondary, marginTop: 4 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionItem: { alignItems: 'center', gap: spacing.xs, width: 76 },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { ...type.small, color: colors.textSecondary, textAlign: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  seeAll: { ...type.caption, color: colors.green },
});
