import { useQuery } from '@tanstack/react-query';

import { api } from '@lib/strapi';
import { FlagResponse, Locale, LocaleWithIcon } from '@models/locales';

const fetchLocales = async (): Promise<LocaleWithIcon[]> => {
  const [locRes, flagRes] = await Promise.all([api.get<Locale[]>('/api/i18n/locales'), api.get<FlagResponse>('/api/flags?populate=icon')]);

  return locRes.data.map((l) => {
    const f = flagRes.data.data.find((x) => x.code === l.code);
    // Return only core business data
    return {
      name: l.name,
      code: l.code,
      isDefault: l.isDefault,
      icon: f ? new URL(f.icon.url, api.defaults.baseURL).toString() : 'https://hatscripts.github.io/circle-flags/flags/xx.svg',
    };
  });
};

export const useLocales = () =>
  useQuery({
    queryKey: ['locales'],
    queryFn: fetchLocales,
  });
