import { render } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

describe('<ThemedText />', () => {
  test('renders children correctly', async () => {
    const { getByText } = await render(<ThemedText>Hello FinTrackr</ThemedText>);
    expect(getByText('Hello FinTrackr')).toBeTruthy();
  });

  test('renders with type="title" without crashing', async () => {
    const { getByText } = await render(<ThemedText type="title">Budget</ThemedText>);
    expect(getByText('Budget')).toBeTruthy();
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<ThemedText>Snapshot text</ThemedText>);
    expect(toJSON()).toMatchSnapshot();
  });
});
