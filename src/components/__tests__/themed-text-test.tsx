import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import { ThemedText } from '@/components/themed-text';

const TEXT_TYPES = [
  'default',
  'title',
  'small',
  'smallBold',
  'subtitle',
  'link',
  'linkPrimary',
  'code',
] as const;

describe('<ThemedText />', () => {
  beforeEach(() => jest.spyOn(RN, 'useColorScheme').mockReturnValue('light'));
  afterEach(() => jest.restoreAllMocks());

  test('renders children correctly', async () => {
    const { getByText } = await render(<ThemedText>Hello FinTrackr</ThemedText>);
    expect(getByText('Hello FinTrackr')).toBeTruthy();
  });

  for (const type of TEXT_TYPES) {
    test(`renders type="${type}"`, async () => {
      const { getByText } = await render(<ThemedText type={type}>{type} text</ThemedText>);
      expect(getByText(`${type} text`)).toBeTruthy();
    });
  }

  test('accepts themeColor="textSecondary"', async () => {
    const { getByText } = await render(
      <ThemedText themeColor="textSecondary">Secondary</ThemedText>,
    );
    expect(getByText('Secondary')).toBeTruthy();
  });

  test('renders in dark mode', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { getByText } = await render(<ThemedText>Dark text</ThemedText>);
    expect(getByText('Dark text')).toBeTruthy();
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<ThemedText>Snapshot text</ThemedText>);
    expect(toJSON()).toMatchSnapshot();
  });
});
