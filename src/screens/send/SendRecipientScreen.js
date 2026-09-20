import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Avatar } from '../../components';
import { colors, type, spacing, radius } from '../../theme';
import { contacts } from '../../data/mockData';

export default function SendRecipientScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) => c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={type.h2}>Send to</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textTertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search name, @username, or phone"
          placeholderTextColor={colors.textTertiary}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionLabel}>Contacts</Text>

      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.contactRow, pressed && { opacity: 0.7 }]}
            onPress={() => navigation.navigate('SendAmount', { contact: item })}
          >
            <Avatar initials={item.initials} seed={item.name} size={46} />
            <View style={styles.contactText}>
              <Text style={type.h3}>{item.name}</Text>
              <Text style={styles.contactSub}>
                {item.handle} · {item.country}
              </Text>
            </View>
            {item.firstTime && (
              <View style={styles.firstTimeBadge}>
                <Text style={styles.firstTimeText}>New</Text>
              </View>
            )}
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No contacts match "{query}"</Text>
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
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
    marginBottom: spacing.lg,
  },
  searchInput: { flex: 1, color: colors.textPrimary, ...type.body },
  sectionLabel: {
    ...type.caption,
    color: colors.textSecondary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  contactText: { flex: 1 },
  contactSub: { ...type.caption, color: colors.textSecondary, marginTop: 2 },
  firstTimeBadge: {
    backgroundColor: 'rgba(59,130,246,0.15)',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  firstTimeText: { ...type.small, color: colors.blue },
  empty: { ...type.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
});
