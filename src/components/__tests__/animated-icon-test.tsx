import { render, fireEvent, act, screen } from '@testing-library/react-native';
import { AnimatedIcon, AnimatedSplashOverlay } from '@/components/animated-icon';

jest.mock('expo-image', () => ({ Image: 'Image' }));
jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn().mockResolvedValue(undefined),
  preventAutoHideAsync: jest.fn(),
}));

describe('<AnimatedIcon />', () => {
  test('renders without crashing', async () => {
    const { toJSON } = await render(<AnimatedIcon />);
    expect(toJSON()).toBeTruthy();
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<AnimatedIcon />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('<AnimatedSplashOverlay />', () => {
  afterEach(() => jest.restoreAllMocks());

  test('renders initially (visible state)', async () => {
    const { toJSON } = await render(<AnimatedSplashOverlay />);
    expect(toJSON()).toBeTruthy();
  });

  test('triggers hideAsync after layout', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const SplashScreen = require('expo-splash-screen');
    await render(<AnimatedSplashOverlay />);

    const view = screen.getByTestId('splash-overlay');
    await act(async () => {
      fireEvent(view, 'layout');
    });

    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });

  test('handles animation callback finishing with false', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Keyframe } = require('react-native-reanimated');
    Keyframe.mockImplementationOnce(() => ({
      duration: jest.fn().mockReturnThis(),
      withCallback: jest.fn((cb: any) => {
        if (cb) cb(false);
        return this;
      }),
    }));
    await render(<AnimatedSplashOverlay />);

    const view = screen.getByTestId('splash-overlay');
    await act(async () => {
      fireEvent(view, 'layout');
    });
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<AnimatedSplashOverlay />);
    expect(toJSON()).toMatchSnapshot();
  });
});
