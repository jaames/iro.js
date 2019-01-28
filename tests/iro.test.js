import test from 'ava';
import iro from '../';

// Core library tests. These make sure that iro exposes the core APIs properly.

test('Core exposes iro.version', t => {
  t.truthy('version' in iro);
});

test('Core exposes ColorPicker API', t => {
  t.truthy('ColorPicker' in iro);
});

test('Core exposes Color API', t => {
  t.truthy('Color' in iro);
});

test('Core exposes iro.use', t => {
  t.truthy('use' in iro);
});

test('Core exposes iro.installedPlugins', t => {
  t.truthy('installedPlugins' in iro);
});

test('Core exposes UI components', t => {
  t.truthy('ui' in iro);
});

test('Core exposes Component base on iro.ui.Component', t => {
  t.truthy('Component' in iro.ui);
});

test('Core exposes Wheel component on iro.ui.Wheel', t => {
  t.truthy('Wheel' in iro.ui);
});

test('Core exposes Slider component on iro.ui.Slider', t => {
  t.truthy('Slider' in iro.ui);
});

test('Core exposes Handle component on iro.ui.Handle', t => {
  t.truthy('Handle' in iro.ui);
});
