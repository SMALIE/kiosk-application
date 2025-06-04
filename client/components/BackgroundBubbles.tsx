import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

import { BlurMask, Canvas, Circle, vec } from '@shopify/react-native-skia';

import { rs } from '@utils/scaling';
import { Colors } from '@constants/Colors';

interface BubbleProps {
  size: number;
  leftPercent: number;
  topPercent: number;
  delay: number;
  blurAmount?: number;
  duration?: number;
}

const Bubble: React.FC<BubbleProps> = ({ size, leftPercent, topPercent, delay, blurAmount = 70, duration = 10000 }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    scale.value = withDelay(delay, withRepeat(withTiming(1.2, { duration, easing: Easing.inOut(Easing.ease) }), -1, true));
    opacity.value = withDelay(delay, withRepeat(withTiming(0.6, { duration: duration * 0.8, easing: Easing.inOut(Easing.ease) }), -1, true));
  }, [delay, duration, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const r = rs(size) / 2;
  const m = blurAmount * 2;

  return (
    <Animated.View
      style={[
        styles.bubbleContainer,
        {
          width: rs(size) + m * 2,
          height: rs(size) + m * 2,
          left: `${leftPercent}%`,
          top: `${topPercent}%`,
        },
        animatedStyle,
      ]}
    >
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Circle c={vec(r + m, r + m)} r={r} color={Colors.background.secondary}>
          <BlurMask blur={blurAmount} style='normal' />
        </Circle>
      </Canvas>
    </Animated.View>
  );
};

export default function BackgroundBubbles() {
  return (
    <View style={styles.container} pointerEvents='none'>
      <Bubble size={200} leftPercent={-10} topPercent={-20} delay={20} />
      <Bubble size={260} leftPercent={55} topPercent={0} delay={1500} />
      <Bubble size={220} leftPercent={-35} topPercent={20} delay={2500} />
      <Bubble size={190} leftPercent={30} topPercent={35} delay={500} />
      <Bubble size={230} leftPercent={-5} topPercent={60} delay={1200} />
      <Bubble size={200} leftPercent={45} topPercent={70} delay={2000} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  bubbleContainer: {
    position: 'absolute',
  },
});
