import { z } from 'zod';

import { createFullSchema, createSingleResponseSchema, iconSchema } from './api';
import { mediaSchema } from './page';

export const linkComponent = z.object({
  logo: mediaSchema,
  url: z.string(),
  handle: z.string(),
});

export type LinkComponent = z.infer<typeof linkComponent>;

export const socialMediaCoreSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  links: z.array(linkComponent).default([]),
  enabled: z.boolean().default(true),
  icon: iconSchema.optional().nullable(),
  locale: z.string(),
});

export type SocialMediaCore = z.infer<typeof socialMediaCoreSchema>;

export const socialMedia = createFullSchema(socialMediaCoreSchema);

export type SocialMedia = z.infer<typeof socialMedia>;

export const socialMediaResponseSchema = createSingleResponseSchema(socialMedia);
export type SocialMediaResponse = z.infer<typeof socialMediaResponseSchema>;
