import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import * as RN from 'react-native';
import HomeScreen from '@/app/index';

const mockDeviceState = { isDevice: false };

jest.mock('expo-device', () => ({
  get isDevice() {
    return mockDeviceState.isDevice;
  },
}));
jest.mock('expo-image', () => ({ Image: 'Image' }));
jest.mock('react-native-safe-area-context', () => {
  const rn = jest.requireActual('react-native');
  return {
    SafeAreaView: rn.View,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});
jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn().mockResolvedValue(undefined),
  preventAutoHideAsync: jest.fn(),
}));
jest.mock('react-native-worklets', () => ({ scheduleOnRN: jest.fn() }));
// Mock the entire animated-icon module so we don't load reanimated/worklets in this test
jest.mock('@/components/animated-icon', () => ({
  AnimatedIcon: () => null,
  AnimatedSplashOverlay: () => null,
}));

describe('<HomeScreen />', () => {
  beforeEach(() => {
    mockDeviceState.isDevice = false;
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
  });
  afterEach(() => jest.restoreAllMocks());

  test('renders "Welcome to" heading', async () => {
    const { getByText } = await render(<HomeScreen />);
    expect(getByText(/Welcome to/i)).toBeTruthy();
  });

  test('renders "get started" label', async () => {
    const { getByText } = await render(<HomeScreen />);
    expect(getByText(/get started/i)).toBeTruthy();
  });

  test('renders all three hint rows', async () => {
    const { getByText } = await render(<HomeScreen />);
    expect(getByText('Try editing')).toBeTruthy();
    expect(getByText('Dev tools')).toBeTruthy();
    expect(getByText('Fresh start')).toBeTruthy();
  });

  test('shows cmd+d shortcut on iOS simulator', async () => {
    jest.replaceProperty(Platform, 'OS', 'ios');
    mockDeviceState.isDevice = false;
    const { getByText } = await render(<HomeScreen />);
    expect(getByText('cmd+d')).toBeTruthy();
  });

  test('shows cmd+m shortcut on Android simulator', async () => {
    jest.replaceProperty(Platform, 'OS', 'android');
    mockDeviceState.isDevice = false;
    const { getByText } = await render(<HomeScreen />);
    expect(getByText('cmd+m (or ctrl+m)')).toBeTruthy();
  });

  test('shows web devtools hint on web', async () => {
    jest.replaceProperty(Platform, 'OS', 'web');
    const { getByText } = await render(<HomeScreen />);
    expect(getByText('use browser devtools')).toBeTruthy();
  });

  test('shows "shake device" hint on real device', async () => {
    jest.replaceProperty(Platform, 'OS', 'ios');
    mockDeviceState.isDevice = true;
    const { getByText } = await render(<HomeScreen />);
    expect(getByText(/shake device/i)).toBeTruthy();
  });

  test('shows WebBadge only on web', async () => {
    jest.replaceProperty(Platform, 'OS', 'web');
    const { queryByText } = await render(<HomeScreen />);
    expect(queryByText(/^v\d+/)).toBeTruthy();
  });

  test('does NOT show WebBadge on native', async () => {
    jest.replaceProperty(Platform, 'OS', 'ios');
    mockDeviceState.isDevice = false;
    const { queryByText } = await render(<HomeScreen />);
    expect(queryByText(/^v\d+/)).toBeNull();
  });

  test('matches snapshot (iOS simulator)', async () => {
    jest.replaceProperty(Platform, 'OS', 'ios');
    mockDeviceState.isDevice = false;
    const { toJSON } = await render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
