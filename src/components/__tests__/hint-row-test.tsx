import { render } from '@testing-library/react-native';
import * as RN from 'react-native';
import { HintRow } from '@/components/hint-row';

describe('<HintRow />', () => {
  beforeEach(() => jest.spyOn(RN, 'useColorScheme').mockReturnValue('light'));
  afterEach(() => jest.restoreAllMocks());

  test('renders with default props', async () => {
    const { getByText } = await render(<HintRow />);
    expect(getByText('Try editing')).toBeTruthy();
    expect(getByText('app/index.tsx')).toBeTruthy();
  });

  test('renders custom title and string hint', async () => {
    const { getByText } = await render(<HintRow title="Dev tools" hint="shake device" />);
    expect(getByText('Dev tools')).toBeTruthy();
    expect(getByText('shake device')).toBeTruthy();
  });

  test('renders a ReactNode hint', async () => {
    const { getByText } = await render(
      <HintRow title="Fresh start" hint={<RN.Text>npm run reset</RN.Text>} />,
    );
    expect(getByText('npm run reset')).toBeTruthy();
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<HintRow title="Test" hint="value" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
