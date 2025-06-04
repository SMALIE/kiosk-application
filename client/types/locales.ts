import { z } from 'zod';

import { createResponseSchema } from './api';

export const localeCoreSchema = z.object({
  name: z.string(),
  code: z.string(),
  isDefault: z.boolean().nullable(),
});

export type LocaleCore = z.infer<typeof localeCoreSchema>;

export const locale = localeCoreSchema.extend({
  id: z.number(),
});

export type Locale = z.infer<typeof locale>;

export const flagCoreSchema = z.object({
  code: z.string(),
  icon: z.object({ url: z.string() }),
});

export type FlagCore = z.infer<typeof flagCoreSchema>;

export const flag = flagCoreSchema.extend({
  id: z.number(),
});

export type Flag = z.infer<typeof flag>;

export const flagResponseSchema = createResponseSchema(flag);
export type FlagResponse = z.infer<typeof flagResponseSchema>;

export interface LocaleWithIcon extends LocaleCore {
  icon: string;
}
