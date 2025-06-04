import React, { createContext, useContext, useEffect, useState } from 'react';

import { usePathname } from 'expo-router';

type History = string[];
type HistoryContextValue = {
  stack: History;
  ignoreNextChange: () => void;
  goBack: () => void;
};

const HistoryCtx = createContext<HistoryContextValue | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [stack, setStack] = useState<History>([pathname]);
  const [ignoreCount, setIgnoreCount] = useState(0);
  useEffect(() => {
    if (ignoreCount > 0) {
      setIgnoreCount((prev) => prev - 1);
      return;
    }

    setStack((prev) => {
      const lastPath = prev[prev.length - 1];
      if (lastPath === pathname) return prev;

      const lastSegments = lastPath.split('/').filter(Boolean);
      const currentSegments = pathname.split('/').filter(Boolean);

      if (
        lastSegments.length === currentSegments.length &&
        lastSegments.length > 0 &&
        lastSegments.slice(1).join('/') === currentSegments.slice(1).join('/')
      ) {
        return [...prev.slice(0, -1), pathname];
      }

      return [...prev, pathname];
    });
  }, [pathname, ignoreCount]);

  const ignoreNextChange = () => {
    setIgnoreCount(2);
  };
  const goBack = () => {
    setStack((prev) => {
      const newStack = prev.length <= 1 ? prev : prev.slice(0, -1);
      return newStack;
    });
  };

  return <HistoryCtx.Provider value={{ stack, ignoreNextChange, goBack }}>{children}</HistoryCtx.Provider>;
};

export const useHistory = () => {
  const ctx = useContext(HistoryCtx);
  if (!ctx) throw new Error('useHistory must be used inside HistoryProvider');
  return ctx;
};
