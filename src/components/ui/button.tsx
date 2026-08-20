import React from 'react';
import { Pressable, type PressableProps, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Rounded, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '../themed-text';

export interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  style?: StyleProp<ViewStyle>;
}

export function Button({ children, variant = 'primary', style, ...rest }: ButtonProps) {
  const theme = useTheme();

  const getContainerStyle = (pressed: boolean): StyleProp<ViewStyle> => {
    let baseStyle: ViewStyle = {
      borderRadius: Rounded.DEFAULT,
      opacity: pressed ? 0.9 : 1,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      overflow: 'hidden', // to ensure gradient or bg stays within border radius
    };

    const innerPadding: ViewStyle = {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    };

    switch (variant) {
      case 'primary':
        baseStyle = {
          ...baseStyle,
          overflow: 'visible', // shadow needs visible overflow
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        };
        break;
      case 'secondary':
        baseStyle = {
          ...baseStyle,
          ...innerPadding,
          backgroundColor: theme.secondary,
        };
        break;
      case 'outline':
        baseStyle = {
          ...baseStyle,
          ...innerPadding,
          borderWidth: 1,
          borderColor: theme.outlineVariant,
          backgroundColor: 'transparent',
        };
        break;
      case 'ghost':
        baseStyle = {
          ...baseStyle,
          ...innerPadding,
          backgroundColor: pressed ? theme.surfaceContainerHigh : 'transparent',
        };
        break;
    }

    return [baseStyle, style];
  };

  const getTextProps = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return { themeColor: 'onPrimary' as const, style: { fontWeight: '600' as const } };
      case 'outline':
      case 'ghost':
        return { themeColor: 'primary' as const, style: { fontWeight: '600' as const } };
    }
  };

  const renderContent = () => {
    const textProps = getTextProps();
    const content =
      typeof children === 'string' ? (
        <ThemedText type="labelMd" {...textProps}>
          {children}
        </ThemedText>
      ) : (
        children
      );

    if (variant === 'primary') {
      return (
        <LinearGradient
          colors={[theme.indigoGradientStart, theme.indigoGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.md,
            borderRadius: Rounded.DEFAULT,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {content}
        </LinearGradient>
      );
    }

    return content;
  };

  return (
    <Pressable style={({ pressed }) => getContainerStyle(pressed)} {...rest}>
      {renderContent()}
    </Pressable>
  );
}
