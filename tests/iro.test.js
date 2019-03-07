import iro from '../src/iro';

describe('Core API', () => {
  test('Core exposes iro.version', () => {
    // check that iro.version constant is set by the define plugin
    expect(iro.version).toBe('TEST');
  });

  test('Core exposes ColorPicker API', () => {
    expect('ColorPicker' in iro).toBeTruthy();
  });

  test('Core exposes Color API', () => {
    expect('Color' in iro).toBeTruthy();
  });

  test('Core exposes iro.use', () => {
    expect('use' in iro).toBeTruthy();
  });

  test('Core exposes iro.installedPlugins', () => {
    expect('installedPlugins' in iro).toBeTruthy();
  });

  test('Core exposes UI components', () => {
    expect('ui' in iro).toBeTruthy();
  });

  test('Core exposes util functions', () => {
    expect('util' in iro).toBeTruthy();
  });

  test('Core exposes resolveUrl util on iro.util.resolveUrl', () => {
    expect('resolveUrl' in iro.util).toBeTruthy();
  });

  test('Core exposes createArcPath util on iro.util.createArcPath', () => {
    expect('createArcPath' in iro.util).toBeTruthy();
  });

  test('Core exposes parseUnit util on iro.util.parseUnit', () => {
    expect('parseUnit' in iro.util).toBeTruthy();
  });

  test('Core exposes parseHexInt util on iro.util.parseHexInt', () => {
    expect('parseHexInt' in iro.util).toBeTruthy();
  });

  test('Core exposes intToHex util on iro.util.intToHex', () => {
    expect('intToHex' in iro.util).toBeTruthy();
  });
});