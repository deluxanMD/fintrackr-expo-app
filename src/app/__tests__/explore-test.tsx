import { render, fireEvent, act } from '@testing-library/react-native';
import * as RN from 'react-native';
import TabTwoScreen from '@/app/explore';

jest.mock('expo-image', () => ({ Image: 'Image' }));
jest.mock('expo-symbols', () => ({ SymbolView: 'SymbolView' }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));
jest.mock('expo-router', () => ({
  Link: ({ children, onPress, href, ...rest }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    const { Pressable } = jest.requireActual('react-native');

    if (rest.asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onPress: (e: any) => {
          onPress?.(e);
          children.props.onPress?.(e);
        },
        testID: 'link',
      });
    }

    return (
      <Pressable testID="link" onPress={(e: any) => onPress?.(e)} {...rest}>
        {children}
      </Pressable>
    );
  },
}));
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn().mockResolvedValue(undefined),
  WebBrowserPresentationStyle: { AUTOMATIC: 'AUTOMATIC' },
}));

describe('<TabTwoScreen />', () => {
  beforeEach(() => jest.spyOn(RN, 'useColorScheme').mockReturnValue('light'));
  afterEach(() => jest.restoreAllMocks());

  test('renders "Explore" title', async () => {
    const { getByText } = await render(<TabTwoScreen />);
    expect(getByText('Explore')).toBeTruthy();
  });

  test('renders all five collapsible section titles', async () => {
    const { getByText } = await render(<TabTwoScreen />);
    expect(getByText('File-based routing')).toBeTruthy();
    expect(getByText('Android, iOS, and web support')).toBeTruthy();
    expect(getByText('Images')).toBeTruthy();
    expect(getByText('Light and dark mode components')).toBeTruthy();
    expect(getByText('Animations')).toBeTruthy();
  });

  test('expands "File-based routing" on press', async () => {
    const { getByText, findByText } = await render(<TabTwoScreen />);
    await act(async () => {
      fireEvent.press(getByText('File-based routing'));
    });
    expect(await findByText(/This app has two screens/)).toBeTruthy();
  });

  test('renders in dark mode without crashing', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { getByText } = await render(<TabTwoScreen />);
    expect(getByText('Explore')).toBeTruthy();
  });

  test('shows WebBadge on web', async () => {
    jest.replaceProperty(RN.Platform, 'OS', 'web');
    const { queryByText } = await render(<TabTwoScreen />);
    expect(queryByText(/^v\d+/)).toBeTruthy();
  });

  test('does NOT show WebBadge on native', async () => {
    jest.replaceProperty(RN.Platform, 'OS', 'ios');
    const { queryByText } = await render(<TabTwoScreen />);
    expect(queryByText(/^v\d+/)).toBeNull();
  });

  test('applies pressed style on link button', async () => {
    const { getByTestId } = await render(<TabTwoScreen />);
    const link = getByTestId('link');
    fireEvent(link, 'pressIn');
    fireEvent(link, 'pressOut');
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<TabTwoScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('explore pressable styles', () => {
  test('executes pressed style function', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getByTestId } = await render(require('@/app/explore').default());
    const link = getByTestId('link');
    if (typeof link.props.style === 'function') {
      link.props.style({ pressed: true });
      link.props.style({ pressed: false });
    }
  });
});
