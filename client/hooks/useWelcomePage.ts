import { useQuery } from '@tanstack/react-query';

import { api } from '@lib/strapi';
import { WelcomePageCore, welcomePageCoreSchema, WelcomePageResponse } from '@models/welcomePage';

export const useWelcomePage = ({ locale }: { locale: string }) =>
  useQuery<WelcomePageCore>({
    queryKey: ['welcome-page', locale],
    queryFn: async () => {
      const res = await api.get<WelcomePageResponse>(`/api/welcome-page?locale=${locale}&populate=media`);

      const welcomePageData = welcomePageCoreSchema.parse(res.data.data);

      if (!welcomePageData) throw new Error('Welcome Page not found');

      return welcomePageData;
    },
  });
