import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { ScreenContainer, TransactionRow } from '../../components';
import { colors, type, spacing } from '../../theme';
import { transactions } from '../../data/mockData';

function groupByDate(items) {
  const groups = {};
  items.forEach((tx) => {
    const d = new Date(tx.date);
    const key = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return Object.entries(groups).map(([title, data]) => ({ title, data }));
}

export default function ActivityScreen() {
  const sections = groupByDate(transactions);

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={type.h1}>Activity</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => <TransactionRow tx={item} />}
        stickySectionHeadersEnabled={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  sectionTitle: {
    ...type.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
});
