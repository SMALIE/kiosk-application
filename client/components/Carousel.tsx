import * as React from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp, View } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';
import Carousel, { CarouselRenderItem, ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

import { useLocalSearchParams } from 'expo-router';

import { CarouselItem } from '@components/CarouselItem';
import { useArticles } from '@hooks/useArticles';
import { rs, wp } from '@utils/scaling';
import type { Article } from '@models/articles';
import { Colors } from '@constants/Colors';

import { Loader } from './Loader';

interface RenderOptions {
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}

const renderItem =
  ({ rounded = false, style }: RenderOptions = {}): CarouselRenderItem<Article> =>
  ({ item }) => <CarouselItem key={item.id} rounded={rounded} style={style} source={{ uri: item.image } as ImageSourcePropType} item={item} />;

export default function CarouselScreen() {
  const { locale } = useLocalSearchParams<{ locale: string }>();

  const { data, isLoading, isError } = useArticles({ locale });

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  if (isLoading) return <Loader />;
  if (!data || isError) return null;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View>
      <Carousel<Article>
        ref={ref}
        data={data}
        width={wp(100)}
        height={rs(320)}
        onProgressChange={(_, p) => {
          progress.value = p;
        }}
        renderItem={renderItem({ rounded: true })}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={6000}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.75,
          parallaxScrollingOffset: rs(210),
          parallaxAdjacentItemScale: 0.5,
        }}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        size={rs(8)}
        dotStyle={{
          borderRadius: 100,
          backgroundColor: Colors.text.secondary,
        }}
        activeDotStyle={{
          borderRadius: 100,
          overflow: 'hidden',
          backgroundColor: Colors.text.primary,
        }}
        containerStyle={{ gap: rs(15) }}
        horizontal
        onPress={onPressPagination}
      />
    </View>
  );
}
