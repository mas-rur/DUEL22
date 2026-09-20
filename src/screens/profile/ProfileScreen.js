import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Avatar } from '../../components';
import { colors, type, spacing, radius } from '../../theme';
import { currentUser } from '../../data/mockData';

const MENU = [
  { icon: 'card-outline', label: 'Payment methods' },
  { icon: 'business-outline', label: 'Linked bank accounts' },
  { icon: 'shield-checkmark-outline', label: 'Security & MFA' },
  { icon: 'person-circle-outline', label: 'Identity verification', badge: 'Verified' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help & support' },
];

export default function ProfileScreen({ navigation }) {
  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Avatar initials={currentUser.avatarInitials} seed={currentUser.name} size={64} />
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>

        <View style={styles.menu}>
          {MENU.map((item) => (
            <Pressable key={item.label} style={styles.menuRow}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={19} color={colors.textPrimary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.logout}
          onPress={() => navigation.getParent()?.replace('Onboarding')}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  header: { alignItems: 'center', paddingVertical: spacing.xl },
  name: { ...type.h2, color: colors.textPrimary, marginTop: spacing.md },
  email: { ...type.caption, color: colors.textSecondary, marginTop: 2 },
  menu: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { ...type.body, color: colors.textPrimary, flex: 1 },
  badge: {
    backgroundColor: 'rgba(23,217,163,0.15)',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { ...type.small, color: colors.green },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
  },
  logoutText: { ...type.button, color: colors.error },
});
