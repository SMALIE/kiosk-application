import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Image } from 'expo-image';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';

import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';

import { useLocales } from '@hooks/useLocales';
import { rs } from '@utils/scaling';
import { Colors } from '@constants/Colors';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { data: locales, isLoading, isError } = useLocales();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const router = useRouter();
  const params = useLocalSearchParams<{ locale: string; slug?: string[] }>();
  const pathname = usePathname();

  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      setCurrentLanguage(i18n.language);
    }
  }, [i18n.language, currentLanguage]);

  if (isLoading)
    return (
      <View>
        <Image source={require('@assets/icons/pl.svg')} style={styles.flag} />
      </View>
    );
  if (isError) return null;

  const onChangeLanguage = (newLang: string) => {
    if (newLang === currentLanguage) return;

    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);

    const rest = params.slug?.length ? params.slug.join('/') : pathname.split('/').slice(2).join('/');

    router.replace(rest ? `/${newLang}/${rest}` : `/${newLang}`);
  };

  const currentLocale = locales!.find((l) => l.code === currentLanguage)!;

  return (
    <View style={styles.wrapper}>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger>
          <Image source={currentLocale.icon} style={styles.flag} />
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Overlay style={styles.overlay} />
          <DropdownMenuPrimitive.Content style={styles.content}>
            <DropdownMenuPrimitive.RadioGroup value={currentLanguage} onValueChange={onChangeLanguage}>
              {locales!
                .filter((l) => l.code !== currentLanguage)
                .map((locale) => (
                  <DropdownMenuPrimitive.RadioItem key={locale.code} value={locale.code} style={styles.item}>
                    <Image source={locale.icon} style={styles.flag} />
                  </DropdownMenuPrimitive.RadioItem>
                ))}
            </DropdownMenuPrimitive.RadioGroup>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'column', gap: rs(6), alignItems: 'center' },

  flag: { width: rs(18), height: rs(18) },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  content: {
    marginTop: rs(24),
    zIndex: 1000,
    backgroundColor: Colors.background.overlay,
    borderWidth: rs(0.8),
    borderRightWidth: 0,
    borderColor: Colors.border.navigation,
    borderRadius: rs(12),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: rs(4),
  },
  item: {
    padding: rs(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
