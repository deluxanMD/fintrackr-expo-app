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

describe('<HomeScreen />', () => {
  beforeEach(() => {
    mockDeviceState.isDevice = false;
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
  });
  afterEach(() => jest.restoreAllMocks());

  test('renders the design system headings', async () => {
    const { getByText } = await render(<HomeScreen />);
    expect(getByText('DESIGN SYSTEM')).toBeTruthy();
    expect(getByText('Vibrant FinTrack')).toBeTruthy();
  });

  test('renders the typography examples', async () => {
    const { getByText } = await render(<HomeScreen />);
    expect(getByText('TYPOGRAPHY')).toBeTruthy();
    expect(getByText('Display Lg (48)')).toBeTruthy();
    expect(getByText('Label Sm (12) - JetBrains Mono')).toBeTruthy();
  });

  test('renders the button variants', async () => {
    const { getByText } = await render(<HomeScreen />);
    expect(getByText('BUTTONS')).toBeTruthy();
    expect(getByText('Primary Gradient')).toBeTruthy();
    expect(getByText('Secondary Action')).toBeTruthy();
    expect(getByText('Outline Button')).toBeTruthy();
    expect(getByText('Ghost Button')).toBeTruthy();
  });

  test('matches snapshot', async () => {
    jest.replaceProperty(Platform, 'OS', 'ios');
    mockDeviceState.isDevice = false;
    const { toJSON } = await render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
