import { useMemo } from 'react';

import { API_CONFIG } from '@config/api';

interface MediaItem {
  url: string;
  mime?: string | null;
}

interface UseMediaResult {
  uri: string;
  isVideo: boolean;
  isImage: boolean;
}

export const useMedia = (media: MediaItem | null | undefined): UseMediaResult | null => {
  return useMemo(() => {
    if (!media?.url) return null;

    const uri = media.url.startsWith('http') ? media.url : `${API_CONFIG.baseURL}${media.url}`;
    const isVideo = Boolean(media.mime?.startsWith('video/'));
    const isImage = Boolean(media.mime?.startsWith('image/'));

    return {
      uri,
      isVideo,
      isImage,
    };
  }, [media]);
};

export const buildMediaUri = (url: string): string => {
  return url.startsWith('http') ? url : `${API_CONFIG.baseURL}${url}`;
};
