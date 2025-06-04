import { z } from 'zod';

// Base Strapi metadata schema (shared by ALL records)
export const strapiMetadataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable(),
});

export type StrapiMetadata = z.infer<typeof strapiMetadataSchema>;

// Generic Strapi pagination schema (for Collection Types)
export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
});

export type Pagination = z.infer<typeof paginationSchema>;

// Generic Strapi meta schema (for Collection Types)
export const metaSchema = z.object({
  pagination: paginationSchema,
});

export type Meta = z.infer<typeof metaSchema>;

// Generic Strapi Collection Type response wrapper
// Used for endpoints that return arrays of items with pagination
export const createResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    meta: metaSchema,
  });

// Generic Strapi Single Type response wrapper
// Used for endpoints that return single items without pagination
export const createSingleResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z.object({}), // Single types always have empty meta object
  });

// Helper type to extract the data type from a response schema
export type ResponseData<T> = T extends z.ZodType<{ data: infer U; meta: any }, any, any> ? U : never;

// Helper type to extract single item type from array response
export type ResponseItem<T> = T extends z.ZodType<{ data: (infer U)[]; meta: any }, any, any> ? U : never;

// Helper type to extract data from single response
export type SingleResponseData<T> = T extends z.ZodType<{ data: infer U; meta: {} }, any, any> ? U : never;

// Additional helpers for common API patterns
export const createErrorSchema = () =>
  z.object({
    error: z.object({
      status: z.number(),
      name: z.string(),
      message: z.string(),
      details: z.record(z.any()).optional().nullable(),
    }),
  });

export type ApiError = z.infer<ReturnType<typeof createErrorSchema>>;

// Global icon schema (shared across multiple types)
export const iconSchema = z.object({
  width: z.number(),
  height: z.number(),
  iconData: z.string(),
  iconName: z.string(),
});

export type Icon = z.infer<typeof iconSchema>;

// Helper to create Full schema from Core schema
export const createFullSchema = <T extends z.ZodRawShape>(coreSchema: z.ZodObject<T>) => coreSchema.extend(strapiMetadataSchema.shape);

// Type-safe response validator
export const validateResponse = <T extends z.ZodSchema>(schema: T, data: unknown): z.infer<T> => {
  return schema.parse(data);
};
