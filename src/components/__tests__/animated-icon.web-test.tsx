import { render } from '@testing-library/react-native';
import { AnimatedIcon, AnimatedSplashOverlay } from '@/components/animated-icon.web';

jest.mock('expo-image', () => ({ Image: 'Image' }));

// For the web animated icon, it imports css modules, which we mocked in jest config
// We also need to mock react-native-reanimated the same way we did globally

describe('<AnimatedIcon /> (web)', () => {
  test('renders without crashing', async () => {
    const { toJSON } = await render(<AnimatedIcon />);
    expect(toJSON()).toBeTruthy();
  });

  test('AnimatedSplashOverlay returns null', async () => {
    const { toJSON } = await render(<AnimatedSplashOverlay />);
    expect(toJSON()).toBeNull();
  });

  test('matches snapshot', async () => {
    const { toJSON } = await render(<AnimatedIcon />);
    expect(toJSON()).toMatchSnapshot();
  });
});
