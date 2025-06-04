import React from 'react';

import { Redirect, useLocalSearchParams } from 'expo-router';

import { LoadingState } from '@ui/LoadingState';
import PageRenderer from '@components/PageRenderer';
import { usePage } from '@hooks/usePage';

export default function Page() {
  const { locale, slug = '' } = useLocalSearchParams<{
    locale: string;
    slug?: string;
  }>();

  const { data, isLoading, isError } = usePage({ documentId: slug, locale });

  return (
    <LoadingState isLoading={isLoading} isError={isError} errorFallback={<Redirect href={`/${locale}`} />}>
      {data && <PageRenderer page={data} />}
    </LoadingState>
  );
}
