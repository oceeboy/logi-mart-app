const colors = {
  primary: '#20C997',
  secondary: '#FF7F50',
  black: '#000000',
  white: '#FFFFFF',
  border: '#CBD5E1',
  apply: '#FCB889',
  inactive: '#FDEEE3',
  neutral: {
    300: '#525252',
    400: '#7B7B7B',
  },
  dark: '#0F172A',
  red: '#DC2626',
  green: '#6DC347',
  error: '#E80D0D',
  success: '#6DC347',
  toastText: {
    success: '#00A11F',
    error: '#A11300',
  },
  toastBg: {
    success: '#DAF1DF',
    error: '#F1DADA',
  },
  borderLight: '#F7F7F7',
  border_alt: '#B2B0B0',
} as const;

const fontFamily = {
  black: 'Poppins-Black',
  bold: 'Poppins-Bold',
  extrabold: 'Poppins-ExtraBold',
  extraLight: 'Poppins-ExtraLight',
  light: 'Poppins-Light',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  thin: 'Poppins-Thin',
} as const;

const fontSize = {
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,
  body5: 8,
  body6: 6,
} as const;

export const THEME = {
  colors,
  fontFamily,
  fontSize,
};
