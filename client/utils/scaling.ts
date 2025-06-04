import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 600;
const BASE_HEIGHT = 980;

const widthScale = SCREEN_WIDTH / BASE_WIDTH;
const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;
const scale = Math.min(widthScale, heightScale);

const maxScale = Platform.select({
  web: 1.5,
  android: 2.0,
  ios: 2.0,
  default: 1.0,
});

const normalizedScale = Math.max(0.8, Math.min(scale, maxScale!));

export const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;
export const rs = (size: number) => Math.round(size * normalizedScale); // responsive size
export const ms = (size: number, factor = 0.5) => size + (normalizedScale - 1) * factor * size; // moderate scale

type CalcUnit = `${number}%` | `rs(${number})` | `wp(${number})` | `hp(${number})` | number;
type CalcOperator = '+' | '-' | '*' | '/';
type CalcExpression = CalcUnit | `${CalcUnit} ${CalcOperator} ${CalcUnit}` | `${CalcUnit} ${CalcOperator} ${CalcUnit} ${CalcOperator} ${CalcUnit}`;

const transformations = [
  { pattern: /(\d+(?:\.\d+)?)%/g, transform: (value: string) => ((SCREEN_WIDTH * parseFloat(value)) / 100).toString() },
  { pattern: /rs\((\d+(?:\.\d+)?)\)/g, transform: (value: string) => rs(parseFloat(value)).toString() },
  { pattern: /wp\((\d+(?:\.\d+)?)\)/g, transform: (value: string) => wp(parseFloat(value)).toString() },
  { pattern: /hp\((\d+(?:\.\d+)?)\)/g, transform: (value: string) => hp(parseFloat(value)).toString() },
];

const processExpression = (expression: string) =>
  transformations.reduce((expr, { pattern, transform }) => expr.replace(pattern, (_, value) => transform(value)), expression);

const parseTemplateString = (strings: TemplateStringsArray, values: (number | string)[]) => strings.map((str, i) => str + (values[i] ?? '')).join('');

const safeEval = (expression: string) => {
  try {
    return Function(`"use strict"; return (${expression})`)();
  } catch {
    return 0;
  }
};

export const calc = (expressionOrStrings: CalcExpression | TemplateStringsArray, ...values: (number | string)[]): number => {
  const expression =
    typeof expressionOrStrings === 'string' ? expressionOrStrings : parseTemplateString(expressionOrStrings as TemplateStringsArray, values);

  return safeEval(processExpression(expression));
};

export const calcWidth = (percentage: number, gap: number) => calc(`${percentage}% - rs(${gap})` satisfies CalcExpression);

export const calcHeight = (percentage: number, gap: number) => calc(`hp(${percentage}) - rs(${gap})` satisfies CalcExpression);

export const screenInfo = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  scale: normalizedScale,
  isTablet: SCREEN_WIDTH >= 768,
  isLargeScreen: SCREEN_WIDTH >= 1024,
  fontScale: PixelRatio.getFontScale(),
  pixelRatio: PixelRatio.get(),
};
