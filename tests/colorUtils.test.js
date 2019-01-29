import test from 'ava';
import * as colorUtils from '../src/util/colorUtils';

test('colorUtils parseUnit() parses CSS ints', t => {
  t.is(colorUtils.parseUnit('100'), 100);
  t.is(colorUtils.parseUnit('2.5'), 2.5);
  t.is(colorUtils.parseUnit('.5'), 0.5);
  t.is(colorUtils.parseUnit('+100'), 100);
  t.is(colorUtils.parseUnit('+2.5'), 2.5);
  t.is(colorUtils.parseUnit('+.5'), 0.5);
  t.is(colorUtils.parseUnit('-100'), -100);
  t.is(colorUtils.parseUnit('-2.5'), -2.5);
  t.is(colorUtils.parseUnit('-.5'), -0.5);
});

test('colorUtils parseUnit() parses CSS percentages', t => {
  t.is(colorUtils.parseUnit('1000%', 100), 1000);
  t.is(colorUtils.parseUnit('100%', 100), 100);
  t.is(colorUtils.parseUnit('50%', 360), 180);
  t.is(colorUtils.parseUnit('2.5%', 100), 2.5);
  t.is(colorUtils.parseUnit('.5%', 100), 0.5);
  t.is(colorUtils.parseUnit('0%', 10), 0);
  t.is(colorUtils.parseUnit('+1000%', 100), 1000);
  t.is(colorUtils.parseUnit('+100%', 100), 100);
  t.is(colorUtils.parseUnit('+50%', 360), 180);
  t.is(colorUtils.parseUnit('+2.5%', 100), 2.5);
  t.is(colorUtils.parseUnit('+.5%', 100), 0.5);
  t.is(colorUtils.parseUnit('+0%', 10), 0);
  t.is(colorUtils.parseUnit('0%', 10), 0);
  t.is(colorUtils.parseUnit('-1000%', 100), -1000);
  t.is(colorUtils.parseUnit('-100%', 100), -100);
  t.is(colorUtils.parseUnit('-50%', 360), -180);
  t.is(colorUtils.parseUnit('-2.5%', 100), -2.5);
  t.is(colorUtils.parseUnit('-.5%', 100), -0.5);
  t.is(colorUtils.parseUnit('-0%', 10), -0);
});

test('colorUtils parseHexInt() converts hex strings to ints', t => {
  t.is(colorUtils.parseHexInt('FF'), 255);
  t.is(colorUtils.parseHexInt('ff'), 255);
  t.is(colorUtils.parseHexInt('F0'), 240);
  t.is(colorUtils.parseHexInt('f0'), 240);
  t.is(colorUtils.parseHexInt('0F'), 15);
  t.is(colorUtils.parseHexInt('0f'), 15);
  t.is(colorUtils.parseHexInt('00'), 0);
});

test('colorUtils intToHex() converts an int to a 2-char hex str', t => {
  t.is(colorUtils.intToHex(255), 'ff');
  t.is(colorUtils.intToHex(240), 'f0');
  t.is(colorUtils.intToHex(15), '0f');
  t.is(colorUtils.intToHex(0), '00');
});