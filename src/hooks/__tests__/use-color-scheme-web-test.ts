import { renderHook, act } from '@testing-library/react-native';
import * as RN from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme.web';

describe('useColorScheme (web)', () => {
  afterEach(() => jest.restoreAllMocks());

  test('returns "light" before hydration (SSR default)', async () => {
    const { result } = await renderHook(() => useColorScheme());
    expect(result.current === 'light' || result.current === null).toBeTruthy();
  });

  test('returns the RN color scheme value after hydration', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { result } = await renderHook(() => useColorScheme());
    await act(async () => {});
    expect(result.current).toBe('dark');
  });
});
