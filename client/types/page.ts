import { z } from 'zod';

import { createFullSchema, createResponseSchema, iconSchema } from './api';

export type IconSchema = z.infer<typeof iconSchema>;

const targetPageSchema = z.object({
  documentId: z.string().optional().nullable(),
  locale: z.string().optional().nullable(),
});

export type TargetPage = z.infer<typeof targetPageSchema>;

export const buttonCoreSchema = z.object({
  icon: iconSchema,
  label: z.string(),
  targetPage: targetPageSchema,
});

export type ButtonCore = z.infer<typeof buttonCoreSchema>;

export const buttonSchema = buttonCoreSchema.extend({
  id: z.number(),
});

export type Button = z.infer<typeof buttonSchema>;

export const mediaCoreSchema = z.object({
  width: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  url: z.string(),
  mime: z.string().optional().nullable(),
});

export type MediaCore = z.infer<typeof mediaCoreSchema>;

export const mediaSchema = mediaCoreSchema.extend({
  id: z.number(),
});

export type Media = z.infer<typeof mediaSchema>;

export const pageCoreSchema = z.object({
  title: z.string().optional().nullable(),
  media: mediaCoreSchema.optional().nullable(),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  buttons: z.array(buttonCoreSchema).optional().nullable().default([]),
  locale: z.string(),
});

export type PageCore = z.infer<typeof pageCoreSchema>;

export const pageSchema = createFullSchema(
  z.object({
    title: z.string().optional().nullable(),
    media: mediaSchema.optional().nullable(),
    description: z.string().optional().nullable(),
    content: z.string().optional().nullable(),
    buttons: z.array(buttonSchema).optional().nullable().default([]),
    locale: z.string(),
  })
);

export type Page = z.infer<typeof pageSchema>;

export const pageResponseSchema = createResponseSchema(pageSchema);

export type PageResponse = z.infer<typeof pageResponseSchema>;
