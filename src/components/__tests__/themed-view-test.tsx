import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

describe('<ThemedView />', () => {
  beforeEach(() => jest.spyOn(RN, 'useColorScheme').mockReturnValue('light'));
  afterEach(() => jest.restoreAllMocks());

  test('renders children', async () => {
    const { getByText } = await render(
      <ThemedView>
        <RN.Text>hello</RN.Text>
      </ThemedView>,
    );
    expect(getByText('hello')).toBeTruthy();
  });

  test('applies background (light) by default', async () => {
    const { toJSON } = await render(<ThemedView testID="view" />);
    const json = toJSON() as any;
    expect(json.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: Colors.light.background }),
      ]),
    );
  });

  test('applies backgroundElement color', async () => {
    const { toJSON } = await render(<ThemedView type="backgroundElement" />);
    const json = toJSON() as any;
    expect(json.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: Colors.light.backgroundElement }),
      ]),
    );
  });

  test('applies backgroundSelected color', async () => {
    const { toJSON } = await render(<ThemedView type="backgroundSelected" />);
    const json = toJSON() as any;
    expect(json.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: Colors.light.backgroundSelected }),
      ]),
    );
  });

  test('applies dark background in dark mode', async () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { toJSON } = await render(<ThemedView testID="view" />);
    const json = toJSON() as any;
    expect(json.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: Colors.dark.background }),
      ]),
    );
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<ThemedView />);
    expect(toJSON()).toMatchSnapshot();
  });
});
