import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import { WebBadge } from '@/components/web-badge';

jest.mock('expo-image', () => ({ Image: 'Image' }));

describe('<WebBadge />', () => {
  afterEach(() => jest.restoreAllMocks());

  test('renders version text in light mode', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { getByText } = await render(<WebBadge />);
    expect(getByText(/^v\d+/)).toBeTruthy();
  });

  test('renders in dark mode without crashing', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { toJSON } = await render(<WebBadge />);
    expect(toJSON()).toBeTruthy();
  });

  test('matches snapshot (light)', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { toJSON } = await render(<WebBadge />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('matches snapshot (dark)', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { toJSON } = await render(<WebBadge />);
    expect(toJSON()).toMatchSnapshot();
  });
});
