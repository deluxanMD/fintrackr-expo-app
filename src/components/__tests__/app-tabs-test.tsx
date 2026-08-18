import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import AppTabs from '@/components/app-tabs';

jest.mock('expo-router/unstable-native-tabs', () => {
  const { View, Text } = jest.requireActual('react-native');

  const NativeTabs = ({ children }: any) => <View testID="native-tabs">{children}</View>;
  NativeTabs.displayName = 'NativeTabs';

  const NativeTabsTrigger = ({ children, name }: any) => (
    <View testID={`trigger-${name}`}>{children}</View>
  );
  NativeTabsTrigger.displayName = 'NativeTabsTrigger';
  NativeTabs.Trigger = NativeTabsTrigger;

  const NativeTabsTriggerLabel = ({ children }: any) => <Text>{children}</Text>;
  NativeTabsTriggerLabel.displayName = 'NativeTabsTriggerLabel';
  NativeTabs.Trigger.Label = NativeTabsTriggerLabel;

  const NativeTabsTriggerIcon = () => null;
  NativeTabsTriggerIcon.displayName = 'NativeTabsTriggerIcon';
  NativeTabs.Trigger.Icon = NativeTabsTriggerIcon;

  return { NativeTabs };
});

describe('<AppTabs /> (native)', () => {
  afterEach(() => jest.restoreAllMocks());

  test('renders in light mode', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { getByTestId } = await render(<AppTabs />);
    expect(getByTestId('native-tabs')).toBeTruthy();
  });

  test('renders in dark mode', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { getByTestId } = await render(<AppTabs />);
    expect(getByTestId('native-tabs')).toBeTruthy();
  });

  test('renders Home and Explore triggers', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { getByText } = await render(<AppTabs />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Explore')).toBeTruthy();
  });

  test('falls back to light colors when scheme is "unspecified"', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('unspecified' as any);
    const { getByTestId } = await render(<AppTabs />);
    expect(getByTestId('native-tabs')).toBeTruthy();
  });

  test('matches snapshot', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { toJSON } = await render(<AppTabs />);
    expect(toJSON()).toMatchSnapshot();
  });
});
