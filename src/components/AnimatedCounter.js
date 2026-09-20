import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, Easing } from 'react-native';

// A self-contained count-up number, built on RN's core Animated API (no
// third-party animation library required). Used once per screen as the
// hero motion moment (e.g. the wallet balance on Home) rather than
// scattered across every element.
export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 2,
  duration = 1100,
  style,
  onDone,
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState('0');
  const prevValue = useRef(0);

  useEffect(() => {
    const listenerId = anim.addListener(({ value: v }) => {
      setDisplay(
        v.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      );
    });

    Animated.timing(anim, {
      toValue: value,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // driving a JS text value, not a native prop
    }).start(() => onDone && onDone());

    prevValue.current = value;

    return () => anim.removeListener(listenerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Text style={style}>
      {prefix}
      {display}
      {suffix}
    </Text>
  );
}
