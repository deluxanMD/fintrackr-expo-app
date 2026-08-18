import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import TabLayout from '@/app/_layout';

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/components/animated-icon', () => {
  return {
    AnimatedSplashOverlay: () => null,
  };
});

jest.mock('@/components/app-tabs', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  const { View } = jest.requireActual('react-native');
  return {
    __esModule: true,
    default: () => React.createElement(View, { testID: 'app-tabs' }),
  };
});

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    __esModule: true,
    DarkTheme: { dark: true, colors: {} },
    DefaultTheme: { dark: false, colors: {} },
    ThemeProvider: ({ children }: any) => React.createElement(React.Fragment, null, children),
  };
});

describe('<TabLayout />', () => {
  afterEach(() => jest.restoreAllMocks());

  test('renders without crashing (light)', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { getByTestId } = await render(<TabLayout />);
    expect(getByTestId('app-tabs')).toBeTruthy();
  });

  test('renders without crashing (dark)', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { getByTestId } = await render(<TabLayout />);
    expect(getByTestId('app-tabs')).toBeTruthy();
  });

  test('matches snapshot', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { toJSON } = await render(<TabLayout />);
    expect(toJSON()).toMatchSnapshot();
  });
});
