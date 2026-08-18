import { render, screen } from '@testing-library/react-native';
import * as RN from 'react-native';
import AppTabsWeb, { TabButton } from '@/components/app-tabs.web';

jest.mock('expo-router', () => ({
  Link: ({ children }: any) => <>{children}</>,
}));

jest.mock('expo-router/ui', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  const { View } = jest.requireActual('react-native');
  return {
    Tabs: ({ children }: any) => <View testID="tabs">{children}</View>,
    TabList: ({ children, asChild }: any) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children);
      }
      return <View>{children}</View>;
    },
    TabTrigger: ({ children, asChild, name }: any) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
          isFocused: name === 'home',
        });
      }
      return <View>{children}</View>;
    },
    TabSlot: () => <View testID="tab-slot" />,
  };
});
jest.mock('expo-symbols', () => ({ SymbolView: 'SymbolView' }));

describe('<AppTabs /> (web)', () => {
  beforeEach(() => jest.spyOn(RN, 'useColorScheme').mockReturnValue('light'));
  afterEach(() => jest.restoreAllMocks());

  test('renders Tabs component', async () => {
    const { getByTestId } = await render(<AppTabsWeb />);
    expect(getByTestId('tabs')).toBeTruthy();
  });
});

describe('TabButton pressable styles', () => {
  test('executes pressed style function', async () => {
    await render(
      <TabButton name="test" isFocused={false}>
        Test
      </TabButton>,
    );
    const pressable = screen.getByTestId('tab-button');
    if (typeof pressable.props.style === 'function') {
      pressable.props.style({ pressed: true });
      pressable.props.style({ pressed: false });
    }
  });
});
