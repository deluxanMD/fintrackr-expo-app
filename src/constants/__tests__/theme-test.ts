describe('theme', () => {
  test('BottomTabInset defaults to 0 on web', () => {
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Platform } = require('react-native');
    Platform.select = (obj: any) => obj.web;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { BottomTabInset } = require('@/constants/theme');
    expect(BottomTabInset).toBe(0);
  });
});
