import { useQuery } from '@tanstack/react-query';

import { api } from '@lib/strapi';
import { Article, ArticleResponse, articleSchema, ArticlesResponse } from '@models/articles';

export const useArticles = ({ locale }: { locale: string }) =>
  useQuery<Article[]>({
    queryKey: ['articles', locale],
    queryFn: async () => {
      const res = await api.get<ArticlesResponse>(`/api/articles?locale=${locale}`);

      try {
        const articles = res.data.data.map((p) => articleSchema.parse(p));

        if (articles.length === 0) throw new Error('Articles not found');

        return articles;
      } catch (error) {
        console.error('Error in mapping/parsing:', error);
        throw error;
      }
    },
  });

export const useArticle = ({ locale, documentId }: { locale: string; documentId: string }) =>
  useQuery<Article>({
    queryKey: ['article', locale, documentId],
    queryFn: async () => {
      const res = await api.get<ArticleResponse>(`/api/articles/${documentId}?locale=${locale}`);

      try {
        const article = articleSchema.parse(res.data.data);

        if (!article) throw new Error('Article not found');

        return article;
      } catch (error) {
        console.error('Error in mapping/parsing:', error);
        throw error;
      }
    },
  });
