import {
  resolveUrl,
  createArcPath
} from '../src/util/svg';

describe('resolveUrl', () => {
  test('resolveUrl correctly resolves URL', () => {
    expect(resolveUrl('#test')).toBe('#test');
  });

  test('resolveUrl correctly resolves full URL when a Safari userAgent is present', () => {
    Object.defineProperty(window.navigator, 'userAgent', {value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15'});
    document.head.innerHTML = '<base href="/" />';
    expect(resolveUrl('#test')).toBe('http://localhost/#test');
    window.history.pushState({}, '', '/example');
    expect(resolveUrl('#test')).toBe('http://localhost/example#test');
    window.history.pushState({}, '', '/example/');
    expect(resolveUrl('#test')).toBe('http://localhost/example/#test');
    window.history.pushState({}, '', '/example?query=example');
    expect(resolveUrl('#test')).toBe('http://localhost/example?query=example#test');
  });
});

describe('createArcPath', () => {
  test('createArcPath correctly creates path commands for arcs', () => {
    expect(createArcPath(0, 0, 60, 0, 0)).toBe('M 60 0 A 60 60 0 0 0 60 0');
    expect(createArcPath(10, 10, 60, 0, 0)).toBe('M 70 10 A 60 60 0 0 0 70 10');
    // could be more robust :/
  });
});

