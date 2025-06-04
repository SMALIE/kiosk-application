import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReactNativeInactivity from 'react-native-inactivity';

import { setBackgroundColorAsync, setBehaviorAsync, setVisibilityAsync } from 'expo-navigation-bar';
import { router, Slot, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';

import BackgroundBubbles from '@components/BackgroundBubbles';
import Header from '@components/Header';
import { Loader } from '@components/Loader';
import NavigationControls from '@components/NavigationControls';
import { useBootstrap } from '@hooks/useBootstrap';
import { rs } from '@utils/scaling';
import { i18n } from '@lib/i18n';
import { queryClient } from '@lib/queryClient';
import { Colors } from '@constants/Colors';
import { HistoryProvider } from '@providers/historyProvider';

export default function Layout() {
  const ready = useBootstrap();

  const { locale } = useLocalSearchParams<{
    locale: string;
    slug?: string[];
  }>();

  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    const setupUI = async () => {
      await setVisibilityAsync('hidden');
      await setBehaviorAsync('overlay-swipe');
      await setBackgroundColorAsync('#000000');
    };

    setupUI();
  }, []);

  if (!ready) return <Loader />;

  return (
    <HistoryProvider>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <ReactNativeInactivity
              timeForInactivity={90000}
              onInactive={() => {
                router.replace('/pl/');
              }}
            >
              <StatusBar hidden />
              <View style={styles.container}>
                <BackgroundBubbles />
                <View style={styles.mainContent}>
                  <Header />
                  <View style={styles.stackContainer}>
                    <Slot />
                  </View>
                </View>
                <View style={styles.navigation}>
                  <NavigationControls />
                </View>
              </View>
              <PortalHost />
            </ReactNativeInactivity>
          </I18nextProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </HistoryProvider>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', width: '100%', height: '100%', backgroundColor: Colors.background.primary, gap: rs(24) },
  mainContent: { flex: rs(8), flexDirection: 'column', gap: rs(28), paddingLeft: rs(30), paddingTop: rs(30), position: 'static' },
  stackContainer: { flex: 1, position: 'static' },
  navigation: { width: rs(40) },
});
