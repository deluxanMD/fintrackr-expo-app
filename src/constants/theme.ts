/**
 * The Vibrant FinTrack design system colors, typography, and spacing.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    surface: '#f8fafc',
    surfaceDim: '#dcd8e5',
    surfaceBright: '#fcf8ff',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f5f2ff',
    surfaceContainer: '#f0ecf9',
    surfaceContainerHigh: '#eae6f4',
    surfaceContainerHighest: '#e4e1ee',
    onSurface: '#1b1b24',
    onSurfaceVariant: '#464555',
    inverseSurface: '#302f39',
    inverseOnSurface: '#f3effc',
    outline: '#777587',
    outlineVariant: '#c7c4d8',
    surfaceTint: '#4d44e3',
    primary: '#3525cd',
    onPrimary: '#ffffff',
    primaryContainer: '#4f46e5',
    onPrimaryContainer: '#dad7ff',
    inversePrimary: '#c3c0ff',
    secondary: '#006c49',
    onSecondary: '#ffffff',
    secondaryContainer: '#6cf8bb',
    onSecondaryContainer: '#00714d',
    tertiary: '#7e3000',
    onTertiary: '#ffffff',
    tertiaryContainer: '#a44100',
    onTertiaryContainer: '#ffd2be',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',
    background: '#fcf8ff',
    onBackground: '#1b1b24',
    surfaceVariant: '#e4e1ee',
    amberWarning: '#f59e0b',
    roseOverbudget: '#f43f5e',
    indigoGradientStart: '#4f46e5',
    indigoGradientEnd: '#818cf8',
    // Fallback/legacy mapping for backward compatibility if needed
    text: '#1b1b24',
    backgroundElement: '#ffffff',
    backgroundSelected: '#f5f2ff',
    textSecondary: '#464555',
  },
  dark: {
    surface: '#121212', // Placeholder dark colors if needed
    surfaceDim: '#0d0d0d',
    surfaceBright: '#1a1a1a',
    surfaceContainerLowest: '#000000',
    surfaceContainerLow: '#121212',
    surfaceContainer: '#1e1e1e',
    surfaceContainerHigh: '#2a2a2a',
    surfaceContainerHighest: '#333333',
    onSurface: '#e2e2e2',
    onSurfaceVariant: '#a3a3a3',
    inverseSurface: '#e2e2e2',
    inverseOnSurface: '#121212',
    outline: '#737373',
    outlineVariant: '#404040',
    surfaceTint: '#a5b4fc',
    primary: '#c3c0ff',
    onPrimary: '#0f0069',
    primaryContainer: '#3525cd',
    onPrimaryContainer: '#dad7ff',
    inversePrimary: '#4d44e3',
    secondary: '#6cf8bb',
    onSecondary: '#003823',
    secondaryContainer: '#005236',
    onSecondaryContainer: '#8bfdd1',
    tertiary: '#ffb695',
    onTertiary: '#441700',
    tertiaryContainer: '#602300',
    onTertiaryContainer: '#ffd2be',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    background: '#121212',
    onBackground: '#e2e2e2',
    surfaceVariant: '#333333',
    amberWarning: '#d97706',
    roseOverbudget: '#e11d48',
    indigoGradientStart: '#818cf8',
    indigoGradientEnd: '#4f46e5',
    // Fallback/legacy mapping for backward compatibility if needed
    text: '#e2e2e2',
    backgroundElement: '#1e1e1e',
    backgroundSelected: '#2a2a2a',
    textSecondary: '#a3a3a3',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Typography = {
  displayLg: {
    fontFamily: 'Manrope',
    fontSize: 48,
    fontWeight: '800' as const,
    lineHeight: 56,
    letterSpacing: -0.02 * 48,
  },
  headlineLg: {
    fontFamily: 'Manrope',
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.01 * 32,
  },
  headlineLgMobile: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  headlineMd: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  labelMd: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0.02 * 14,
  },
  labelSm: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.05 * 12,
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  xs: 4, // 0.25rem (assuming 1rem = 16px)
  sm: 12, // 0.75rem
  md: 24, // 1.5rem
  lg: 48, // 3rem
  xl: 80, // 5rem
  gutter: 24,
  marginMobile: 16,
  marginDesktop: 40,
  // Legacy mappings for backward compatibility
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Rounded = {
  sm: 4, // 0.25rem
  DEFAULT: 8, // 0.5rem
  md: 12, // 0.75rem
  lg: 16, // 1rem
  xl: 24, // 1.5rem
  full: 9999, // 9999px
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
