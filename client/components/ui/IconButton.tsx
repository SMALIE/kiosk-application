import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

import { Text } from '@ui/Text';
import { rs } from '@utils/scaling';
import { Fonts } from '@models/fonts';
import { Button } from '@models/page';
import { Colors } from '@constants/Colors';

interface IconButtonProps {
  button: Button;
  style?: StyleProp<ViewStyle>;
  blurIntensity?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ button, style, blurIntensity = 9 }) => {
  const extractPaths = (iconData: string) => {
    const matches = [...iconData.matchAll(/<path([^>]+)>/g)];

    return matches.map((match) => {
      const attrs = match[1];
      const d = attrs.match(/d="([^"]+)"/)?.[1] || '';
      const fill = attrs.match(/fill="([^"]+)"/)?.[1] || 'none';

      return { d, fill };
    });
  };

  const paths = extractPaths(button.icon.iconData);

  return (
    <BlurView intensity={blurIntensity} style={[styles.blurView, style]}>
      <LinearGradient
        colors={[Colors.border.primary, '#8B94A9', Colors.border.primary]}
        locations={[0.2, 0.5, 0.8]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      />

      <Link href={`/${button.targetPage.locale}/${button.targetPage.documentId}`} asChild>
        <Pressable style={styles.button}>
          <Text font={Fonts.REGULAR} style={styles.buttonText}>
            {button.label}
          </Text>

          <Svg width={rs(32)} height={rs(32)} viewBox={`0 0 ${button.icon.width} ${button.icon.height}`}>
            {paths.map(({ d, fill }, idx) => (
              <Path key={idx} d={d} fill={fill === 'none' ? 'none' : Colors.icon.primary} fillRule='evenodd' />
            ))}
          </Svg>
        </Pressable>
      </Link>
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
    width: `${(100 - 2) / 2}%`,
  },
  gradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: rs(1),
    zIndex: 1,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: rs(16),
    paddingVertical: rs(24),
    gap: rs(12),
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: Colors.text.primary,
    fontSize: rs(18),
    fontFamily: Fonts.REGULAR,
  },
});

export default IconButton;
