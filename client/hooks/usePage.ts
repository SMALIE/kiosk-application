import { useQuery } from '@tanstack/react-query';

import { api } from '@lib/strapi';
import { Page, PageResponse, pageSchema } from '@models/page';

export const usePage = ({ documentId, locale }: { documentId: string; locale: string }) =>
  useQuery<Page>({
    queryKey: ['page', documentId, locale],
    queryFn: async () => {
      const res = await api.get<PageResponse>(`/api/pages?filters[documentId][$eq]=${documentId}&locale=${locale}`);

      try {
        const pages = res.data.data.map((p) => pageSchema.parse(p));

        if (pages.length === 0) throw new Error('Page not found');

        return pages[0];
      } catch (error) {
        console.error('Error in mapping/parsing:', error);
        throw error;
      }
    },
  });
