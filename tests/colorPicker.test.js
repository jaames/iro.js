import IroColorPicker from '../src/colorPicker';
import IroColor from '../src/color';

// TODO: much more robust testing

let root;

beforeAll(() => {
  root = document.createElement('div');
  (document.body || document.documentElement).appendChild(root);
});

beforeEach(() => {
  root.innerHTML = '';
});

afterAll(() => {
  root.parentNode.removeChild(root);
  root = null;
});

describe('ColorPicker mounting', () => {
  
  test('ColorPicker successfully mounts', () => {
    const colorPicker = new IroColorPicker(root);
    expect(root.children.length).toBe(1);
  });

  test('ColorPicker renders root div with class .iro__colorPicker', () => {
    const colorPicker = new IroColorPicker(root);
    const colorPickerBase = root.children[0];
    expect(colorPickerBase.tagName).toBe('DIV');
    expect(colorPickerBase.className).toBe('iro__colorPicker');
  });

  // Need to make sure that mount() is fired even if the event is registered after the colorpicker mount?
  // test('ColorPicker fires mount event', done => {
  //   const colorPicker = new IroColorPicker(root);
  //   colorPicker.on('mount', function() {
  //     done()
  //   });
  // });
});

describe('ColorPicker public properties', () => {

  test('ColorPicker el property references its DOM container element', () => {
    const colorPicker = new IroColorPicker(root);
    expect(colorPicker.el).toBe(root);
  });

  test('ColorPicker base property references its DOM root element', () => {
    const colorPicker = new IroColorPicker(root);
    expect(colorPicker.base).toBe(root.children[0]);
  });

  test('ColorPicker color property is an iro.Color instance', () => {
    const colorPicker = new IroColorPicker(root);
    expect(colorPicker.color instanceof IroColor).toBeTruthy();
  });

});

describe('ColorPicker config object', () => {

  test('ColorPicker receives defaultProps as default config params', () => {
    const colorPicker = new IroColorPicker(root);
    expect(Object.keys(colorPicker.props)).toEqual(expect.arrayContaining(Object.keys(IroColorPicker.defaultProps)));
  });

  test('ColorPicker initial config props are merged into component state', () => {
    const colorPicker = new IroColorPicker(root);
    expect(Object.keys(colorPicker.state)).toEqual(expect.arrayContaining(Object.keys(colorPicker.props)));
  });

  test('ColorPicker receives config from constructor function as props', () => {
    const colorPicker = new IroColorPicker(root, {
      color: '#ff0000',
      width: 200,
      display: 'flex'
    });
    expect(colorPicker.props.color).toBe('#ff0000');
    expect(colorPicker.props.width).toBe(200);
    expect(colorPicker.props.display).toBe('flex');
  });

});

describe('ColorPicker events API', () => {

  test('ColorPicker on() method registers an event', done => {
    const colorPicker = new IroColorPicker(root);
    colorPicker.on('test', function() {
      done();
    });
    colorPicker.emit('test');
  });

  test('ColorPicker off() method unregisters an event', () => {
    const colorPicker = new IroColorPicker(root);
    let wasCalled = false;
    let callback = function() {
      wasCalled = true;
    }
    colorPicker.on('test', callback);
    colorPicker.off('test', callback);
    colorPicker.emit('test');
    expect(wasCalled).toBeFalsy();
  });

});

describe('ColorPicker color API', () => {

  test('ColorPicker default selected color is created from the config value', () => {
    const colorPicker = new IroColorPicker(root, {
      color: {h: 360, s: 0, v: 100}
    });
    expect(colorPicker.color.hsv).toMatchObject({h: 360, s: 0, v: 100});
  });

  test('ColorPicker color:change event is fired when the color changes', done => {
    const colorPicker = new IroColorPicker(root, {
      color: {h: 360, s: 0, v: 100}
    });
    colorPicker.on('color:change', function() {
      done();
    });
    colorPicker.color.hsv = {h: 0, s: 100, v: 0};
  });

});