import { useQuery } from '@tanstack/react-query';

import { api } from '@lib/strapi';
import { SocialMedia, socialMedia, SocialMediaResponse } from '@models/socialMedia';

export const useSocialMedia = ({ locale }: { locale: string }) =>
  useQuery<SocialMedia>({
    queryKey: ['social-media', locale],
    queryFn: async () => {
      const res = await api.get<SocialMediaResponse>(`/api/social-media?locale=${locale}&populate=links.logo`);

      const socialMediaData = socialMedia.parse(res.data.data);

      if (!socialMediaData) throw new Error('Social Media not found');

      return socialMediaData;
    },
  });
