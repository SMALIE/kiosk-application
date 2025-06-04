import { useMemo } from 'react';

import type { Button } from '@models/page';

import { usePage } from './usePage';
import { useSocialMedia } from './useSocialMedia';
import { useWifi } from './useWifi';

interface UseMenuParams {
  locale: string;
}

export function useMenu({ locale }: UseMenuParams) {
  const { data: page, isLoading: pageLoading, isError: pageError } = usePage({ documentId: 'excu9jlf78qi55v57lgg4n7w', locale });
  const { data: socialMedia } = useSocialMedia({ locale });
  const { data: wifi } = useWifi({ locale });

  const menuData = useMemo(() => {
    if (!page) return null;

    const buttons: Button[] = [];
    let buttonIdCounter = 1000;

    if (page.buttons) {
      buttons.push(...page.buttons);
    }
    if (wifi?.enabled && wifi.icon) {
      buttons.push({
        id: buttonIdCounter++,
        icon: wifi.icon,
        label: wifi.title,
        targetPage: {
          documentId: 'wifi',
          locale: wifi.locale,
        },
      });
    }
    if (socialMedia?.enabled && socialMedia.icon) {
      buttons.push({
        id: buttonIdCounter++,
        icon: socialMedia.icon,
        label: socialMedia.title,
        targetPage: {
          documentId: 'social-media',
          locale: socialMedia.locale,
        },
      });
    }

    return {
      ...page,
      buttons,
    };
  }, [page, socialMedia, wifi]);
  const isLoading = pageLoading;
  const isError = pageError;

  return {
    data: menuData,
    isLoading,
    isError,
  };
}
