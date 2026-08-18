import { renderHook } from '@testing-library/react-native';
import * as RN from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

describe('use-color-scheme', () => {
  afterEach(() => jest.restoreAllMocks());

  test('exports useColorScheme from react-native and works', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { result } = await renderHook(() => useColorScheme());
    expect(result.current).toBe('dark');
  });
});
