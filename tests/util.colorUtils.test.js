import {
  parseUnit,
  parseHexInt,
  intToHex
} from '../src/util/colorUtils';

describe('parseUnit()', () => {
  test('parseUnit() parses CSS ints', () => {
    expect(parseUnit('100')).toBe(100);
    expect(parseUnit('2.5')).toBe(2.5);
    expect(parseUnit('.5')).toBe(0.5);
    expect(parseUnit('+100')).toBe(100);
    expect(parseUnit('+2.5')).toBe(2.5);
    expect(parseUnit('+.5')).toBe(0.5);
    expect(parseUnit('-100')).toBe(-100);
    expect(parseUnit('-2.5')).toBe(-2.5);
    expect(parseUnit('-.5')).toBe(-0.5);
  });

  test('parseUnit() parses CSS percentages', () => {
    expect(parseUnit('1000%', 100)).toBe(1000);
    expect(parseUnit('100%', 100)).toBe(100);
    expect(parseUnit('50%', 360)).toBe(180);
    expect(parseUnit('2.5%', 100)).toBe(2.5);
    expect(parseUnit('.5%', 100)).toBe(0.5);
    expect(parseUnit('0%', 10)).toBe(0);
    expect(parseUnit('+1000%', 100)).toBe(1000);
    expect(parseUnit('+100%', 100)).toBe(100);
    expect(parseUnit('+50%', 360)).toBe(180);
    expect(parseUnit('+2.5%', 100)).toBe(2.5);
    expect(parseUnit('+.5%', 100)).toBe(0.5);
    expect(parseUnit('+0%', 10)).toBe(0);
    expect(parseUnit('0%', 10)).toBe(0);
    expect(parseUnit('-1000%', 100)).toBe(-1000);
    expect(parseUnit('-100%', 100)).toBe(-100);
    expect(parseUnit('-50%', 360)).toBe(-180);
    expect(parseUnit('-2.5%', 100)).toBe(-2.5);
    expect(parseUnit('-.5%', 100)).toBe(-0.5);
    expect(parseUnit('-0%', 10)).toBe(-0);
  });
});

describe('parseHexInt()', () => {
  test('parseHexInt() converts hex strings to ints', () => {
    expect(parseHexInt('FF')).toBe(255);
    expect(parseHexInt('ff')).toBe(255);
    expect(parseHexInt('F0')).toBe(240);
    expect(parseHexInt('f0')).toBe(240);
    expect(parseHexInt('0F')).toBe(15);
    expect(parseHexInt('0f')).toBe(15);
    expect(parseHexInt('00')).toBe(0);
  });
});

describe('intToHex()', () => {
  test('intToHex() converts an int to a 2-char hex str', () => {
    expect(intToHex(255)).toBe('ff');
    expect(intToHex(240)).toBe('f0');
    expect(intToHex(15)).toBe('0f');
    expect(intToHex(0)).toBe('00');
  });
});