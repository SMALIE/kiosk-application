import React from 'react';
import { Image, View, ViewProps } from 'react-native';

import VideoPlayer from '@components/VideoPlayer';
import { useMedia } from '@hooks/useMedia';
import { rs } from '@utils/scaling';
import { commonStyles } from '@constants/CommonStyles';

interface MediaDisplayProps extends ViewProps {
  media?: { url: string; mime?: string | null } | null;
  imageStyle?: object;
  videoStyle?: object;
}

export const MediaDisplay: React.FC<MediaDisplayProps> = ({ media, imageStyle, videoStyle, style, ...props }) => {
  const mediaInfo = useMedia(media);

  if (!mediaInfo) return null;

  return (
    <View style={[commonStyles.mediaContainer, style]} {...props}>
      {mediaInfo.isVideo ? (
        <VideoPlayer uri={mediaInfo.uri} style={[{ borderRadius: rs(12) }, videoStyle]} />
      ) : (
        <Image source={{ uri: mediaInfo.uri }} style={[commonStyles.mediaImage, imageStyle]} resizeMode='cover' />
      )}
    </View>
  );
};
