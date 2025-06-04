import React from 'react';

import { Redirect, useLocalSearchParams } from 'expo-router';

import { LoadingState } from '@ui/LoadingState';
import MenuRenderer from '@components/MenuRenderer';
import { useMenu } from '@hooks/useMenu';

const MenuPage: React.FC = () => {
  const { locale } = useLocalSearchParams<{ locale: string }>();
  const { data: menu, isLoading, isError } = useMenu({ locale });

  if (!locale) return <Redirect href='/pl' />;

  return (
    <LoadingState isLoading={isLoading} isError={isError} errorFallback={<Redirect href={`/${locale}`} />}>
      <MenuRenderer menu={menu!} />
    </LoadingState>
  );
};

export default MenuPage;
