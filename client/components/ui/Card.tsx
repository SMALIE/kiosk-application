import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { rs } from '@utils/scaling';
import { Colors } from '@constants/Colors';

const Card: React.FC<ViewProps & { intensity?: number }> = ({ style, children, intensity = 6 }) => {
  return (
    <BlurView intensity={intensity} style={[styles.blurView]}>
      <LinearGradient
        colors={[Colors.border.primary, '#8B94A9', Colors.border.primary]}
        locations={[0.2, 0.5, 0.8]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      />
      <View style={[styles.container, style]}>{children}</View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurView: {
    alignItems: 'center',
    backgroundColor: 'rgba(12, 31, 79, 0.1)',
    borderRadius: rs(16),
    borderTopLeftRadius: 0,
    overflow: 'hidden',
    borderWidth: rs(1),
    borderColor: Colors.border.primary,
  },
  gradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: rs(1),
    zIndex: 1,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: rs(16),
    paddingVertical: rs(24),
    gap: rs(12),
    justifyContent: 'center',
    width: '100%',
  },
});

export default Card;
