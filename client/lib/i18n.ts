import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

export const i18nInitPromise = i18n.use(initReactI18next).init({
  lng: 'pl',
  fallbackLng: 'pl',
  interpolation: { escapeValue: false },
  resources: {},
});

export { i18n };
