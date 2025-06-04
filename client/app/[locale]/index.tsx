import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';

import { LoadingState } from '@ui/LoadingState';
import VideoBackground from '@components/VideoBackground';
import { useMedia } from '@hooks/useMedia';
import { useWelcomePage } from '@hooks/useWelcomePage';
import { i18n } from '@lib/i18n';
import { commonStyles } from '@constants/CommonStyles';

const Home: React.FC = () => {
  const { locale } = useLocalSearchParams<{ locale: string }>();
  const { data, isLoading, isError } = useWelcomePage({ locale });
  const mediaInfo = useMedia(data?.media);

  if (!locale) return <Redirect href='/pl/menu' />;

  const overlayContent = (
    <>
      <LinearGradient
        colors={['rgba(8, 15, 27, 0.9)', 'rgba(8, 15, 27, 0.3)', 'transparent']}
        locations={[0, 0.2, 0.3]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={commonStyles.absoluteFill}
      />
      <View style={[commonStyles.centerContent, { flex: 1 }]}>
        <Link href={`/${i18n.language}/menu`} style={StyleSheet.absoluteFill} />
      </View>
    </>
  );

  return (
    <LoadingState isLoading={isLoading} isError={isError} errorFallback={<Redirect href={`/${locale}/menu`} />}>
      {mediaInfo?.isImage ? (
        <View style={commonStyles.absoluteFill}>
          <Image source={{ uri: mediaInfo.uri }} style={commonStyles.absoluteFill} resizeMode='cover' />
          {overlayContent}
        </View>
      ) : (
        <VideoBackground src={mediaInfo?.uri || ''}>{overlayContent}</VideoBackground>
      )}
    </LoadingState>
  );
};

export default Home;
