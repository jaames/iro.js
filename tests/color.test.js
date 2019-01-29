import test from 'ava';
import Color from '../src/color';

const roundObject = (obj) => Object.keys(obj).reduce((result, key) => {
  result[key] = Math.round(obj[key]);
  return result;
}, {});

// Color API tests. These ensure that colors are converted and parsed properly 

test('iro.Color is a constructor', t => {
  t.truthy(!!Color.prototype && !!Color.prototype.constructor.name);
});

// Test color conversion

test('Color.rgbToHsv accurately converts rgb to hsv', t => {
  // Pure white
  t.deepEqual(Color.rgbToHsv({r: 255, g: 255, b: 255}), {h: 0, s: 0, v: 100});
  // Pure black
  t.deepEqual(Color.rgbToHsv({r: 0, g: 0, b: 0}), {h: 0, s: 0, v: 0});
  // Pure red
  t.deepEqual(Color.rgbToHsv({r: 255, g: 0, b: 0}), {h: 0, s: 100, v: 100});
  // Pure yellow
  t.deepEqual(Color.rgbToHsv({r: 255, g: 255, b: 0}), {h: 60, s: 100, v: 100});
  // Pure green
  t.deepEqual(Color.rgbToHsv({r: 0, g: 255, b: 0}), {h: 120, s: 100, v: 100});
  // Pure cyan
  t.deepEqual(Color.rgbToHsv({r: 0, g: 255, b: 255}), {h: 180, s: 100, v: 100});
  // Pure blue
  t.deepEqual(Color.rgbToHsv({r: 0, g: 0, b: 255}), {h: 240, s: 100, v: 100});
  // Pure magenta
  t.deepEqual(Color.rgbToHsv({r: 255, g: 0, b: 255}), {h: 300, s: 100, v: 100});
});

test('Color.hsvToRgb accurately converts hsv to rgb', t => {
  // Pure white
  t.deepEqual(Color.hsvToRgb({h: 0, s: 0, v: 100}), {r: 255, g: 255, b: 255});
  // Pure black
  t.deepEqual(Color.hsvToRgb({h: 0, s: 0, v: 0}), {r: 0, g: 0, b: 0});
  // Pure red
  t.deepEqual(Color.hsvToRgb({h: 0, s: 100, v: 100}), {r: 255, g: 0, b: 0});
  // Pure yellow
  t.deepEqual(Color.hsvToRgb({h: 60, s: 100, v: 100}), {r: 255, g: 255, b: 0});
  // Pure green
  t.deepEqual(Color.hsvToRgb({h: 120, s: 100, v: 100}), {r: 0, g: 255, b: 0});
  // Pure cyan
  t.deepEqual(Color.hsvToRgb({h: 180, s: 100, v: 100}), {r: 0, g: 255, b: 255});
  // Pure blue
  t.deepEqual(Color.hsvToRgb({h: 240, s: 100, v: 100}), {r: 0, g: 0, b: 255});
  // Pure magenta
  t.deepEqual(Color.hsvToRgb({h: 300, s: 100, v: 100}), {r: 255, g: 0, b: 255});
});

test('Color.hslToHsv accurately converts hsl to hsv', t => {
  // Pure white
  t.deepEqual(Color.hslToHsv({h: 0, s: 0, l: 100}), {h: 0, s: 0, v: 100});
  // Pure black
  t.deepEqual(Color.hslToHsv({h: 0, s: 0, l: 0}), {h: 0, s: 0, v: 0});
  // 25% s 25% l
  t.deepEqual(Color.hslToHsv({h: 0, s: 25, l: 25}), {h: 0, s: 40, v: 31.25});
  // 50% s 50% l
  t.deepEqual(roundObject(Color.hslToHsv({h: 0, s: 50, l: 50})), {h: 0, s: 67, v: 75});
  // 75% s 75% l
  t.deepEqual(Color.hslToHsv({h: 0, s: 75, l: 75}), {h: 0, s: 40, v: 93.75});
});

test('Color.hsvToHsl accurately converts hsv to hsl', t => {
  // Pure white
  t.deepEqual(Color.hsvToHsl({h: 0, s: 0, v: 100}), {h: 0, s: 0, l: 100});
  // Pure black
  t.deepEqual(Color.hsvToHsl({h: 0, s: 0, v: 0}), {h: 0, s: 0, l: 0});
  // 25% s 25% l
  t.deepEqual(Color.hsvToHsl({h: 0, s: 40, v: 31.25}), {h: 0, s: 25, l: 25});
  // 50% s 50% l
  t.deepEqual(roundObject(Color.hsvToHsl({h: 0, s: 67, v: 75})), {h: 0, s: 50, l: 50});
  // 75% s 75% l
  t.deepEqual(Color.hsvToHsl({h: 0, s: 40, v: 93.75}), {h: 0, s: 75, l: 75});
});

test('iro.Color can be constructed with a hsv object', t => {
  var hsv = { h: 360, s: 100, v: 50, a: 1 };
  var color = new Color(hsv);
  t.deepEqual(color._value, hsv);
});

test('iro.Color can be constructed with an rgb object', t => {
  var color = new Color({r: 255, g: 255, b: 255});
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
});

test('iro.Color can be constructed with a hsl object', t => {
  var color = new Color({h: 0, s: 0, l: 100});
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
});

// Test constructor color parsing

test('iro.Color can be constructed with an rgb or rgba string', t => {
  var color = new Color('rgb(255, 255, 255)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgb(255,255,255)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgb 255 255 255');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgba(255, 255, 255, 1)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgba(255,255,255,1)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgba 255 255 255 1');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
});

test('iro.Color can be constructed with an rgb or rgba percentage string', t => {
  var color = new Color('rgb(100%, 100%, 100%)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgb(100%,100%,100%)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgb 100% 100% 100%');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgba(100%, 100%, 100%, 100%)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgba(100%,100%,100%,100%)');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
  var color = new Color('rgba 100% 100% 100% 100%');
  t.deepEqual(roundObject(color._value), {h: 0, s: 0, v: 100});
});

test('iro.Color can be constructed with an hsl or hsla string', t => {
  var color = new Color('hsl(360, 100%, 100%)');
  t.deepEqual(roundObject(color._value), {h: 360, s: 0, v: 100});
  var color = new Color('hsl(360,100%,100%)');
  t.deepEqual(roundObject(color._value), {h: 360, s: 0, v: 100});
  var color = new Color('hsl 360 100% 100%');
  t.deepEqual(roundObject(color._value), {h: 360, s: 0, v: 100});
  var color = new Color('hsla(360, 100%, 100%, 1)');
  t.deepEqual(roundObject(color._value), {h: 360, s: 0, v: 100});
  var color = new Color('hsla(360,100%,100%,1)');
  t.deepEqual(roundObject(color._value), {h: 360, s: 0, v: 100});
  var color = new Color('hsla 360 100% 100% 1');
  t.deepEqual(roundObject(color._value), {h: 360, s: 0, v: 100});
});

test('iro.Color can be constructed with a hex3 value', t => {
  var color = new Color('#fff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('#FFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('fff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xfff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
});

test('iro.Color can be constructed with a hex4 value', t => {
  var color = new Color('#ffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('#FFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('ffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xFFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
});

test('iro.Color can be constructed with a hex6 value', t => {
  var color = new Color('#ffffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('#FFFFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('ffffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('FFFFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xffffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xFFFFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
});

test('iro.Color can be constructed with a hex8 value', t => {
  var color = new Color('#ffffffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('#FFFFFFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('ffffffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('FFFFFFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xffffffff');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
  var color = new Color('0xFFFFFFFF');
  t.deepEqual(color._value, {h: 0, s: 0, v: 100});
});

// Test color properties

test('iro.Color hsv property is readable', t => {
  const hsv = { h: 360, s: 100, v: 50, a: 1 };
  const color = new Color(hsv);
  t.deepEqual(color.hsv, hsv);
});

test('iro.Color hsv property is writable', t => {
  const hsv = { h: 360, s: 100, v: 50, a: 1 };
  const color = new Color();
  color.hsv = hsv;
  t.deepEqual(color._value, hsv);
});

test('iro.Color rgb property is readable', t => {
  const color = new Color({ h: 360, s: 100, v: 50 });
  t.deepEqual(color.rgb, {r: 128, g: 0, b: 0});
});

test('iro.Color rgb property is writable', t => {
  const color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.rgb = {r: 128, g: 0, b: 0};
  t.deepEqual(roundObject(color.hsv), { h: 0, s: 100, v: 50, a: NaN });
});

test('iro.Color hsl property is readable', t => {
  const color = new Color({ h: 360, s: 100, v: 50 });
  t.deepEqual(color.hsl, {h: 360, s: 100, l: 25});
});

test('iro.Color hsl property is writable', t => {
  const color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.hsl = {h: 360, s: 100, l: 100};
  t.deepEqual(roundObject(color.hsv), { h: 360, s: 0, v: 100, a: NaN });
});

test('iro.Color rgbString property is readable', t => {
  const color = new Color({ h: 360, s: 100, v: 50 });
  t.deepEqual(color.rgbString, 'rgb(128, 0, 0)');
});

test('iro.Color rgbString property is writable', t => {
  const color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.rgbString = 'rgb(128, 0, 0)';
  t.deepEqual(roundObject(color.hsv), { h: 0, s: 100, v: 50, a: NaN });
});

test('iro.Color hslString property is readable', t => {
  const color = new Color({ h: 360, s: 100, v: 50 });
  t.deepEqual(color.hslString, 'hsl(360, 100%, 25%)');
});

test('iro.Color hslString property is writable', t => {
  const color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.hslString = 'hsl(360, 100%, 25%)';
  t.deepEqual(roundObject(color.hsv), { h: 360, s: 100, v: 50, a: NaN });
});

test('iro.Color hexString property is readable', t => {
  const color = new Color({r: 255, g: 0, b: 0});
  t.deepEqual(color.hexString, '#ff0000');
});

test('iro.Color hexString property is writable', t => {
  const color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.hexString = '#ff0000';
  t.deepEqual(roundObject(color.rgb), {r: 255, g: 0, b: 0});
});

// Test color instance methods

test('iro.Color clone method returns a new color with the same value', t => {
  const color = new Color({h: 0, s: 100, v: 100, a: 1});
  const cloneColor = color.clone();
  t.deepEqual(color.hsv, cloneColor.hsv);
});

// set() is also used internally by the iro.Color parser, 
// so the constructor tests already make that this method parses different colors properly
test('iro.Color set method successfully updates the color value', t => {
  const color = new Color({h: 0, s: 100, v: 100, a: 1});
  color.set({h: 360, s: 0, v: 0, a: 0});
  t.deepEqual(color.hsv, {h: 360, s: 0, v: 0, a: 0});
});

test('iro.Color setChannel method successfully sets hsv channels', t => {
  var color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.setChannel('hsv', 'h', 360);
  t.deepEqual(color.hsv, {h: 360, s: 0, v: 0, a: 0});

  var color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.setChannel('hsv', 's', 100);
  t.deepEqual(color.hsv, {h: 0, s: 100, v: 0, a: 0});

  var color = new Color({h: 0, s: 0, v: 0, a: 0});
  color.setChannel('hsv', 'v', 100);
  t.deepEqual(color.hsv, {h: 0, s: 0, v: 100, a: 0});
});

test('iro.Color setChannel method successfully sets rgb channels', t => {
  var color = new Color({r: 0, g: 0, b: 0});
  color.setChannel('rgb', 'r', 255);
  t.deepEqual(color.rgb, {r: 255, g: 0, b: 0});

  var color = new Color({r: 0, g: 0, b: 0});
  color.setChannel('rgb', 'g', 255);
  t.deepEqual(color.rgb, {r: 0, g: 255, b: 0});

  var color = new Color({r: 0, g: 0, b: 0});
  color.setChannel('rgb', 'b', 255);
  t.deepEqual(color.rgb, {r: 0, g: 0, b: 255});
});

// Test _onChange callback (used internally to update color picker)

test.cb('iro.Color accepts and fires _onChange callback', t => {
  t.plan(1);
  const color = new Color({ h: 360, s: 100, v: 100, a: 1 });
  color._onChange = function() {
    t.pass();
    t.end();
  }
  color.hsv = { h: 0, s: 0, v: 0, a: 0 };
});

test.cb('iro.Color _onChange callback receives color and changes params', t => {
  t.plan(2);
  const color = new Color({ h: 360, s: 100, v: 100, a: 1 });
  color._onChange = function(color, changes) {
    t.is(color, color);
    t.truthy(('h' in changes) && ('s' in changes) && ('v' in changes) && ('a' in changes));
    t.end();
  }
  color.hsv = { h: 0, s: 0, v: 0, a: 0 };
});

test.cb('iro.Color _onChange changes param provides an accurate diff or color changes', t => {
  t.plan(1);
  const color = new Color({ h: 360, s: 100, v: 100, a: 1 });
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

