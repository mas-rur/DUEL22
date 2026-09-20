import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function ScreenContainer({ children, style, edges }) {
  return (
    <SafeAreaView
      style={[styles.safe, style]}
      edges={edges || ['top', 'bottom', 'left', 'right']}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  inner: {
    flex: 1,
  },
});
