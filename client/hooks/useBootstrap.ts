import { useEffect, useState } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { i18nInitPromise } from '@lib/i18n';
import { Fonts } from '@models/fonts';

SplashScreen.preventAutoHideAsync();

export const useBootstrap = () => {
  const [ready, setReady] = useState(false);

  const [fontsLoaded, fontErr] = useFonts({
    [Fonts.THIN]: require('@assets/fonts/Geist-Thin.ttf'),
    [Fonts.EXTRA_LIGHT]: require('@assets/fonts/Geist-ExtraLight.ttf'),
    [Fonts.LIGHT]: require('@assets/fonts/Geist-Light.ttf'),
    [Fonts.REGULAR]: require('@assets/fonts/Geist-Regular.ttf'),
    [Fonts.MEDIUM]: require('@assets/fonts/Geist-Medium.ttf'),
    [Fonts.SEMI_BOLD]: require('@assets/fonts/Geist-SemiBold.ttf'),
    [Fonts.BOLD]: require('@assets/fonts/Geist-Bold.ttf'),
    [Fonts.EXTRA_BOLD]: require('@assets/fonts/Geist-ExtraBold.ttf'),
    [Fonts.BLACK]: require('@assets/fonts/Geist-Black.ttf'),
  });

  useEffect(() => {
    Promise.all([i18nInitPromise, fontsLoaded || fontErr]).finally(() => {
      setReady(true);
      SplashScreen.hideAsync();
    });
  }, [fontsLoaded, fontErr]);

  return ready;
};
