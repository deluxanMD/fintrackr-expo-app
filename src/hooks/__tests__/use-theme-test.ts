import { renderHook } from '@testing-library/react-native';
import * as RN from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Colors } from '@/constants/theme';

describe('useTheme', () => {
  afterEach(() => jest.restoreAllMocks());

  test('returns light theme when scheme is "light"', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { result } = await renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.light);
  });

  test('returns dark theme when scheme is "dark"', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { result } = await renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.dark);
  });

  test('falls back to light when scheme is "unspecified"', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('unspecified' as any);
    const { result } = await renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.light);
  });

  test('falls back to light when scheme is null', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue(null);
    const { result } = await renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.light);
  });
});
