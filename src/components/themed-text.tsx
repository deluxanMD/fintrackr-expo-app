import { Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Combine legacy types with new Typography keys
export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'small'
    | 'smallBold'
    | 'subtitle'
    | 'link'
    | 'linkPrimary'
    | 'code'
    | keyof typeof Typography;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'onSurface'] },
        // Legacy mappings mapped to new or similar styles
        type === 'default' && Typography.bodyMd,
        type === 'title' && Typography.displayLg,
        type === 'subtitle' && Typography.headlineMd,
        type === 'small' && Typography.labelMd,
        type === 'smallBold' && [Typography.labelMd, { fontWeight: '700' }],
        type === 'link' && [Typography.labelMd, { color: theme.primary }],
        type === 'linkPrimary' && [Typography.labelMd, { color: theme.primary }],
        type === 'code' && [Typography.labelSm, { fontFamily: Fonts.mono }],
        // New typography mappings
        type === 'displayLg' && Typography.displayLg,
        type === 'headlineLg' && Typography.headlineLg,
        type === 'headlineLgMobile' && Typography.headlineLgMobile,
        type === 'headlineMd' && Typography.headlineMd,
        type === 'bodyLg' && Typography.bodyLg,
        type === 'bodyMd' && Typography.bodyMd,
        type === 'labelMd' && Typography.labelMd,
        type === 'labelSm' && Typography.labelSm,
        style,
      ]}
      {...rest}
    />
  );
}
