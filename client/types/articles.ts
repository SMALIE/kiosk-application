import { z } from 'zod';

import { createFullSchema, createResponseSchema, createSingleResponseSchema } from './api';

export const articleCoreSchema = z.object({
  title: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
  content: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  category: z.number().int().optional().nullable(),
  scraped: z.boolean().default(false).optional().nullable(),
  locale: z.string().optional().nullable(),
});
export type ArticleCore = z.infer<typeof articleCoreSchema>;

export const articleSchema = createFullSchema(articleCoreSchema);
export type Article = z.infer<typeof articleSchema>;

export const articlesResponseSchema = createResponseSchema(articleSchema);
export type ArticlesResponse = z.infer<typeof articlesResponseSchema>;

export const articleResponseSchema = createSingleResponseSchema(articleSchema);
export type ArticleResponse = z.infer<typeof articleResponseSchema>;
