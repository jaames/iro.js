import test from 'ava';
import iro from '../';

test('iro.Color is a constructor', t => {
  t.truthy(!!iro.Color.prototype && !!iro.Color.prototype.constructor.name);
});

test('iro.Color can be constructed with a hsv value', t => {
  const hsv = { h: 360, s: 100, v: 50, a: 1 };
  const color = new iro.Color(hsv);
  t.deepEqual(color._value, hsv);
});

test('iro.Color hsv property is readable', t => {
  const hsv = { h: 360, s: 100, v: 50, a: 1 };
  const color = new iro.Color(hsv);
  t.deepEqual(color.hsv, hsv);
});

test('iro.Color hsv property is writable', t => {
  const hsv = { h: 360, s: 100, v: 50, a: 1 };
  const color = new iro.Color();
  color.hsv = hsv;
  t.deepEqual(color._value, hsv);
});

test('iro.Color.rgbToHsv accurately converts rgb to hsv', t => {
  // Pure white
  t.deepEqual(iro.Color.rgbToHsv({r: 255, g: 255, b: 255}), {h: 0, s: 0, v: 100});
  // Pure black
  t.deepEqual(iro.Color.rgbToHsv({r: 0, g: 0, b: 0}), {h: 0, s: 0, v: 0});
  // Pure red
  t.deepEqual(iro.Color.rgbToHsv({r: 255, g: 0, b: 0}), {h: 0, s: 100, v: 100});
  // Pure yellow
  t.deepEqual(iro.Color.rgbToHsv({r: 255, g: 255, b: 0}), {h: 60, s: 100, v: 100});
  // Pure green
  t.deepEqual(iro.Color.rgbToHsv({r: 0, g: 255, b: 0}), {h: 120, s: 100, v: 100});
  // Pure cyan
  t.deepEqual(iro.Color.rgbToHsv({r: 0, g: 255, b: 255}), {h: 180, s: 100, v: 100});
  // Pure blue
  t.deepEqual(iro.Color.rgbToHsv({r: 0, g: 0, b: 255}), {h: 240, s: 100, v: 100});
  // Pure magenta
  t.deepEqual(iro.Color.rgbToHsv({r: 255, g: 0, b: 255}), {h: 300, s: 100, v: 100});
});

test('iro.Color.hsvTorgb accurately converts hsv to rgb', t => {
  // Pure white
  t.deepEqual(iro.Color.hsvToRgb({h: 0, s: 0, v: 100}), {r: 255, g: 255, b: 255});
  // Pure black
  t.deepEqual(iro.Color.hsvToRgb({h: 0, s: 0, v: 0}), {r: 0, g: 0, b: 0});
  // Pure red
  t.deepEqual(iro.Color.hsvToRgb({h: 0, s: 100, v: 100}), {r: 255, g: 0, b: 0});
  // Pure yellow
  t.deepEqual(iro.Color.hsvToRgb({h: 60, s: 100, v: 100}), {r: 255, g: 255, b: 0});
  // Pure green
  t.deepEqual(iro.Color.hsvToRgb({h: 120, s: 100, v: 100}), {r: 0, g: 255, b: 0});
  // Pure cyan
  t.deepEqual(iro.Color.hsvToRgb({h: 180, s: 100, v: 100}), {r: 0, g: 255, b: 255});
  // Pure blue
  t.deepEqual(iro.Color.hsvToRgb({h: 240, s: 100, v: 100}), {r: 0, g: 0, b: 255});
  // Pure magenta
  t.deepEqual(iro.Color.hsvToRgb({h: 300, s: 100, v: 100}), {r: 255, g: 0, b: 255});
});

test.cb('iro.Color accepts and fires _onChange callback', t => {
  t.plan(1);
  const color = new iro.Color({ h: 360, s: 100, v: 100, a: 1 });
  color._onChange = function() {
    t.pass();
    t.end();
  }
  color.hsv = { h: 0, s: 0, v: 0, a: 0 };
});

test.cb('iro.Color _onChange callback receives color and changes params', t => {
  t.plan(2);
  const color = new iro.Color({ h: 360, s: 100, v: 100, a: 1 });
  color._onChange = function(color, changes) {
    t.is(color, color);
    t.truthy(('h' in changes) && ('s' in changes) && ('v' in changes) && ('a' in changes));
    t.end();
  }
  color.hsv = { h: 0, s: 0, v: 0, a: 0 };
});

test.cb('iro.Color _onChange changes param provides an accurate diff or color changes', t => {
  t.plan(1);
  const color = new iro.Color({ h: 360, s: 100, v: 100, a: 1 });
  color._onChange = function(color, changes) {
    // all hsva channels should have changed
    t.deepEqual(changes, {
      h: true,
      s: true,
      v: true,
      a: true
    });
    t.end();
  }
  color.hsv = { h: 0, s: 0, v: 0, a: 0 };
});

