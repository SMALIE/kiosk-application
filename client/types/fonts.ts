export enum Fonts {
  THIN = 'Geist-Thin',
  EXTRA_LIGHT = 'Geist-ExtraLight',
  LIGHT = 'Geist-Light',
  REGULAR = 'Geist-Regular',
  MEDIUM = 'Geist-Medium',
  SEMI_BOLD = 'Geist-SemiBold',
  BOLD = 'Geist-Bold',
  EXTRA_BOLD = 'Geist-ExtraBold',
  BLACK = 'Geist-Black',
}

export type FontWeight = keyof typeof Fonts;
