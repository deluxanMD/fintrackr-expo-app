// Global test setup — runs before every test file
// Mock modules that rely on native TurboModules unavailable in Jest

// react-native-worklets has native-only internals
jest.mock('react-native-worklets', () => ({
  scheduleOnRN: jest.fn((fn: () => void, ...args: any[]) => fn(...args)),
  createSerializable: jest.fn(),
  isWorklet: jest.fn(() => false),
}));

// react-native-reanimated's own mock re-exports worklets, so we provide a clean stub
jest.mock('react-native-reanimated', () => {
  const Animated = jest.requireActual('react-native').Animated;
  const View = jest.requireActual('react-native').View;

  function mockKeyframe(definition: any) {
    return {
      duration: jest.fn().mockReturnThis(),
      withCallback: jest.fn(function (this: any, cb: any) {
        if (cb) {
          cb(true);
          cb(false);
        }
        return this;
      }),
    };
  }

  const MockAnimated = {
    ...Animated,
    View: View,
    createAnimatedComponent: (component: any) => component,
  };

  return {
    __esModule: true,
    default: MockAnimated,
    Animated: MockAnimated,
    Keyframe: jest.fn().mockImplementation(mockKeyframe),
    Easing: {
      elastic: jest.fn(() => jest.fn()),
      linear: jest.fn(),
      ease: jest.fn(),
      bezier: jest.fn(() => jest.fn()),
    },
    FadeIn: { duration: jest.fn().mockReturnThis() },
    useAnimatedStyle: jest.fn(() => ({})),
    useSharedValue: jest.fn((v: any) => ({ value: v })),
    withTiming: jest.fn((v: any) => v),
    withSpring: jest.fn((v: any) => v),
    runOnJS: jest.fn((fn: any) => fn),
    measure: jest.fn(),
    useAnimatedRef: jest.fn(() => ({ current: null })),
  };
});
