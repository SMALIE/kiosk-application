import { useEffect, useState } from 'react';

import { Href, Redirect } from 'expo-router';

import { Loader } from '@components/Loader';
import { useWelcomePage } from '@hooks/useWelcomePage';
import { i18n } from '@lib/i18n';

export default function RootIndex() {
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    const current = i18n.language || (i18n.options.fallbackLng as string);

    i18n.changeLanguage(current);

    setLang(current);
  }, []);

  const { data, isLoading, isError } = useWelcomePage({ locale: lang || 'pl' });

  if (isLoading || !lang) return <Loader />;

  if (isError || !data) return <Redirect href={`/${lang}`} />;

  const path = data.enabled ? `/${lang}` : `/${lang}/menu`;

  return <Redirect href={path as Href} />;
}
