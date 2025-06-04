import React from 'react';

import { Redirect, useLocalSearchParams } from 'expo-router';

import { LoadingState } from '@ui/LoadingState';
import PageRenderer from '@components/PageRenderer';
import { useArticle } from '@hooks/useArticles';

export default function ArticlePage() {
  const { locale, documentId } = useLocalSearchParams<{
    locale: string;
    documentId: string;
  }>();

  const { data, isLoading, isError } = useArticle({ documentId, locale });

  const pageData = data
    ? {
        title: data.title,
        content: data.content,
        media: {
          url: data.image || 'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg',
        },
      }
    : null;

  return (
    <LoadingState isLoading={isLoading} isError={isError} errorFallback={<Redirect href={`/${locale}/menu`} />}>
      {pageData && <PageRenderer page={pageData} />}
    </LoadingState>
  );
}
