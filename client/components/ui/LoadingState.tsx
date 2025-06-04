import React from 'react';

import { Loader } from '@components/Loader';

interface LoadingStateProps {
  isLoading: boolean;
  isError?: boolean;
  errorFallback?: React.ReactNode;
  children: React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ isLoading, isError = false, errorFallback = null, children }) => {
  if (isLoading) return <Loader />;
  if (isError) return <>{errorFallback}</>;
  return <>{children}</>;
};
