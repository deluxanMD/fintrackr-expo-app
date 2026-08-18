import { render, fireEvent, act, screen } from '@testing-library/react-native';
import * as RN from 'react-native';
import { Collapsible } from '@/components/ui/collapsible';

describe('<Collapsible />', () => {
  beforeEach(() => jest.spyOn(RN, 'useColorScheme').mockReturnValue('light'));
  afterEach(() => jest.restoreAllMocks());

  test('renders title', async () => {
    const { getByText } = await render(<Collapsible title="File routing" />);
    expect(getByText('File routing')).toBeTruthy();
  });

  test('children are hidden initially', async () => {
    const { queryByText } = await render(
      <Collapsible title="Routing">
        <RN.Text>Hidden content</RN.Text>
      </Collapsible>,
    );
    expect(queryByText('Hidden content')).toBeNull();
  });

  test('reveals children after pressing the heading', async () => {
    const { getByText, findByText } = await render(
      <Collapsible title="Routing">
        <RN.Text>Revealed content</RN.Text>
      </Collapsible>,
    );
    await act(async () => {
      fireEvent.press(getByText('Routing'));
    });
    expect(await findByText('Revealed content')).toBeTruthy();
  });

  test('hides children again on second press', async () => {
    const { getByText, queryByText, findByText } = await render(
      <Collapsible title="Routing">
        <RN.Text>Toggled content</RN.Text>
      </Collapsible>,
    );
    await act(async () => {
      fireEvent.press(getByText('Routing'));
    });
    expect(await findByText('Toggled content')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getByText('Routing'));
    });
    expect(queryByText('Toggled content')).toBeNull();
  });

  test('matches snapshot (closed)', async () => {
    const { toJSON } = await render(
      <Collapsible title="Snap">
        <RN.Text>Content</RN.Text>
      </Collapsible>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('matches snapshot (open)', async () => {
    const { getByText, toJSON } = await render(
      <Collapsible title="Snap Open">
        <RN.Text>Open Content</RN.Text>
      </Collapsible>,
    );
    await act(async () => {
      fireEvent.press(getByText('Snap Open'));
    });
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('collapsible pressable styles', () => {
  test('executes pressed style function', async () => {
    await render(<Collapsible title="test" />);
    const pressable = screen.getByTestId('collapsible-pressable');
    if (typeof pressable.props.style === 'function') {
      pressable.props.style({ pressed: true });
      pressable.props.style({ pressed: false });
    }
  });
});
