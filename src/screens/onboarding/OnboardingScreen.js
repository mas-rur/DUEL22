import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientGlow, PrimaryButton } from '../../components';
import { colors, type, spacing } from '../../theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    icon: 'planet-outline',
    title: 'Send money.\nNo borders.',
    body: 'Blockchain-fast transfers to the people who matter, without the multi-day wait.',
  },
  {
    icon: 'pricetag-outline',
    title: 'Only pay the\nnetwork fee.',
    body: 'No hidden charges. You always see exactly what you send and what they receive, before you confirm.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Verify, then\nsend with confidence.',
    body: 'Every transfer shows you the recipient first \u2014 send right away, or double-check before you do.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

  const onScroll = (e) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <GradientGlow variant="blue" style={styles.flex}>
      <View style={styles.topRow}>
        <Text style={styles.wordmark}>DUEL22</Text>
        <Pressable onPress={() => navigation.replace('Login')}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={styles.flex}
      >
        {SLIDES.map((s, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <View style={styles.iconWrap}>
              <Ionicons name={s.icon} size={40} color={colors.green} />
            </View>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.body}>{s.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <PrimaryButton
          label={index === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={goNext}
        />
      </View>
    </GradientGlow>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  wordmark: { ...type.h3, color: colors.textPrimary, letterSpacing: 1 },
  skip: { ...type.body, color: colors.textSecondary },
  slide: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(23,217,163,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { ...type.display, color: colors.textPrimary, marginBottom: spacing.md },
  body: { ...type.bodyLight, color: colors.textSecondary, maxWidth: 320 },
  bottom: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.green,
    width: 22,
  },
});
