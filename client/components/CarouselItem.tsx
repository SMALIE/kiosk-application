import React from 'react';
import { ImageSourcePropType, Pressable, StyleSheet, View, type ViewProps } from 'react-native';

import type { ImageStyle, StyleProp } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

import { Text } from '@ui/Text';
import { rs } from '@utils/scaling';
import type { Article } from '@models/articles';
import { Fonts } from '@models/fonts';
import { commonStyles } from '@constants/CommonStyles';

interface CarouselItemProps extends AnimatedProps<ViewProps> {
  style?: StyleProp<ImageStyle>;
  rounded?: boolean;
  source?: ImageSourcePropType;
  item: Article;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ style, rounded = false, item, source }) => {
  return (
    <Link href={`/${item.locale}/_news/${item.documentId}`} asChild>
      <Pressable style={commonStyles.fullSize}>
        <Animated.View style={commonStyles.fullSize}>
          <Animated.Image style={[style, commonStyles.fullSize, rounded && commonStyles.rounded]} source={source} resizeMode='cover' />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.85)', 'rgb(0, 0, 0)']}
            locations={[0.1, 0.45, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[commonStyles.absoluteFill, styles.gradient, commonStyles.rounded]}
          />
          <View style={styles.overlay}>
            <Text style={styles.date}>{item.date}</Text>
            <View style={styles.headerContainer}>
              <Text font={Fonts.SEMI_BOLD} style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
                {item.title}
              </Text>
            </View>
            <View>
              <Text style={styles.content} numberOfLines={3} ellipsizeMode='tail'>
                {item.content}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  gradient: {
    opacity: 0.9,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: rs(0),
    justifyContent: 'flex-end',
    padding: rs(32),
    gap: rs(10),
    overflow: 'hidden',
  },
  date: {
    color: 'white',
    fontSize: rs(14),
    opacity: 0.8,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: rs(19),
  },
  content: {
    color: 'white',
    fontSize: rs(16),
    opacity: 0.9,
    lineHeight: rs(22),
  },
});
