import { Platform } from 'react-native';

const normalizeColor = (color: string) => {
  if (color.startsWith('rgb')) {
    return color;
  }
  return color;
};

const ColorPalette = {
  dark: {
    900: '#0D0F14',
    800: '#111B3A',
    700: '#272D3C',
    600: '#343A4A',
    500: '#48484A',
    400: '#8E8E93',
    300: '#A4AABE',
    200: '#C7C7CC',
    100: '#D9D9D9',
  },

  white: '#FFFFFF',
  black: '#000000',
} as const;

export const Colors = {
  background: {
    primary: normalizeColor(ColorPalette.dark[900]),
    secondary: normalizeColor(ColorPalette.dark[800]),
    overlay: 'rgba(39, 45, 60, 0.7)',
  },

  text: {
    primary: normalizeColor(ColorPalette.white),
    secondary: normalizeColor(ColorPalette.dark[400]),
    tertiary: normalizeColor(ColorPalette.dark[200]),
    disabled: normalizeColor(ColorPalette.dark[300]),
    inverse: normalizeColor(ColorPalette.black),
  },

  border: {
    primary: normalizeColor(ColorPalette.dark[700]),
    secondary: normalizeColor(ColorPalette.dark[600]),
    navigation: 'rgba(139, 148, 169, 0.2)',
  },

  icon: {
    primary: normalizeColor(ColorPalette.dark[100]),
    secondary: normalizeColor(ColorPalette.white),
    disabled: normalizeColor(ColorPalette.dark[300]),
    active: normalizeColor(ColorPalette.white),
    inactive: normalizeColor(ColorPalette.dark[300]),
  },

  shadow: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    },
    default: {},
  }),

  gradients: {
    background: [ColorPalette.dark[900], ColorPalette.dark[800]],
    overlay: ['rgba(52, 58, 74, 0.2)', 'rgba(52, 58, 74, 0.6)'],
  },
} as const;

export const withOpacity = (color: string, opacity: number): string => {
  const clampedOpacity = Math.max(0, Math.min(1, opacity));

  if (color.startsWith('#')) {
    const alpha = Math.round(clampedOpacity * 255)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase();
    return `${color}${alpha}`;
  }

  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', `rgba(`).replace(')', `, ${clampedOpacity})`);
  }

  if (color.startsWith('rgba(')) {
    return color.replace(/,\s*[\d.]+\)$/, `, ${clampedOpacity})`);
  }

  return color;
};

export const ColorUtils = {
  getContrastColor: (backgroundColor: string): string => {
    const isLight = backgroundColor === '#FFFFFF' || backgroundColor.includes('255, 255, 255');
    return isLight ? Colors.text.inverse : Colors.text.primary;
  },

  adjustBrightness: (color: string, amount: number): string => {
    if (amount > 0) {
      return withOpacity(Colors.background.primary, 1 - amount);
    }
    return withOpacity(color, 1 + amount);
  },
} as const;

export type ColorPaletteKey = keyof typeof Colors;
