import { z } from 'zod';

import { createFullSchema, createSingleResponseSchema } from './api';
import { mediaSchema } from './page';

export const welcomePageCoreSchema = z.object({
  media: mediaSchema,
  enabled: z.boolean().default(true),
  locale: z.string(),
});

export type WelcomePageCore = z.infer<typeof welcomePageCoreSchema>;

export const welcomePageSchema = createFullSchema(welcomePageCoreSchema);

export type WelcomePage = z.infer<typeof welcomePageSchema>;

export const welcomePageResponseSchema = createSingleResponseSchema(welcomePageSchema);
export type WelcomePageResponse = z.infer<typeof welcomePageResponseSchema>;
