import React, { useEffect, useRef } from 'react';
import { Pressable, View, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// A bell that gives one deliberate motion moment — a quick shake plus a
// pop-in badge — rather than looping forever. Re-shakes briefly on tap as
// direct feedback to the person's action.
export default function NotificationBell({ hasUnread, onPress, size = 20 }) {
  const rotate = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;

  const shake = () => {
    rotate.setValue(0);
    Animated.sequence([
      Animated.timing(rotate, { toValue: 1, duration: 80, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: -1, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 0.6, duration: 90, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: -0.4, duration: 90, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 0, duration: 90, easing: Easing.linear, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    if (hasUnread) {
      const t = setTimeout(() => {
        shake();
        Animated.spring(badgeScale, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }).start();
      }, 350); // small delay so it reads as "arriving", not popping in with the layout
      return () => clearTimeout(t);
    } else {
      badgeScale.setValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUnread]);

  const rotateDeg = rotate.interpolate({ inputRange: [-1, 1], outputRange: ['-18deg', '18deg'] });

  return (
    <Pressable
      onPress={() => {
        shake();
        onPress && onPress();
      }}
      style={styles.wrap}
      hitSlop={10}
    >
      <Animated.View style={{ transform: [{ rotate: rotateDeg }] }}>
        <Ionicons name="notifications-outline" size={size} color={colors.textPrimary} />
      </Animated.View>
      <Animated.View
        style={[
          styles.badge,
          { transform: [{ scale: badgeScale }], opacity: badgeScale },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
});
