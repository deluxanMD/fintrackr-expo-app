import { render, fireEvent } from '@testing-library/react-native';
import * as RN from 'react-native';
import { ExternalLink } from '@/components/external-link';

const mockOpenBrowserAsync = jest.fn();

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: (...args: any[]) => mockOpenBrowserAsync(...args),
  WebBrowserPresentationStyle: { AUTOMATIC: 'AUTOMATIC' },
}));

jest.mock('expo-router', () => {
  const { Pressable, Text } = jest.requireActual('react-native');
  return {
    Link: ({ children, onPress, href, ...rest }: any) => (
      <Pressable testID="external-link" onPress={(e: any) => onPress?.(e)} {...rest}>
        <Text testID="link-href">{href}</Text>
      </Pressable>
    ),
  };
});

describe('<ExternalLink />', () => {
  beforeEach(() => {
    mockOpenBrowserAsync.mockResolvedValue(undefined);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('renders link element', async () => {
    const { getByTestId } = await render(<ExternalLink href="https://expo.dev" />);
    expect(getByTestId('external-link')).toBeTruthy();
    expect(getByTestId('link-href').props.children).toBe('https://expo.dev');
  });

  test('opens in-app browser on native press', async () => {
    jest.replaceProperty(RN.Platform, 'OS', 'ios');
    const { getByTestId } = await render(<ExternalLink href="https://expo.dev" />);
    const mockEvent = { preventDefault: jest.fn() };
    await fireEvent(getByTestId('external-link'), 'press', mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockOpenBrowserAsync).toHaveBeenCalledWith('https://expo.dev', {
      presentationStyle: 'AUTOMATIC',
    });
  });

  test('does NOT open in-app browser on web', async () => {
    jest.replaceProperty(RN.Platform, 'OS', 'web');
    const { getByTestId } = await render(<ExternalLink href="https://expo.dev" />);
    const mockEvent = { preventDefault: jest.fn() };
    await fireEvent(getByTestId('external-link'), 'press', mockEvent);
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    expect(mockOpenBrowserAsync).not.toHaveBeenCalled();
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<ExternalLink href="https://expo.dev" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
