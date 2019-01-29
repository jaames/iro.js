import iro from '../src/iro';

// Core library tests. These make sure that iro exposes the core APIs properly.

test('Core exposes iro.version', () => {
  expect('version' in iro).toBeTruthy();
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

test('Core exposes Component base on iro.ui.Component', () => {
  expect('Component' in iro.ui).toBeTruthy();
});

test('Core exposes Wheel component on iro.ui.Wheel', () => {
  expect('Wheel' in iro.ui).toBeTruthy();
});

test('Core exposes Slider component on iro.ui.Slider', () => {
  expect('Slider' in iro.ui).toBeTruthy();
});

test('Core exposes Handle component on iro.ui.Handle', () => {
  expect('Handle' in iro.ui).toBeTruthy();
});
