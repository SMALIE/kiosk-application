import { z } from 'zod';

import { createFullSchema, createSingleResponseSchema, iconSchema } from './api';

export const wifiEncryptionSchema = z.enum(['nopass', 'WEP', 'WPA']);
export type WifiEncryption = z.infer<typeof wifiEncryptionSchema>;

export const wifiCoreSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  ssid: z.string(),
  password: z.string().nullable(),
  encryption: wifiEncryptionSchema.default('WPA'),
  enabled: z.boolean().default(true),
  icon: iconSchema.optional().nullable(),
  locale: z.string(),

  ssidPlaceholder: z.string(),
  passwordPlaceholder: z.string(),
});

export type WifiCore = z.infer<typeof wifiCoreSchema>;

export const wifiSchema = createFullSchema(wifiCoreSchema);

export type Wifi = z.infer<typeof wifiSchema>;

export const wifiResponseSchema = createSingleResponseSchema(wifiSchema);
export type WifiResponse = z.infer<typeof wifiResponseSchema>;
