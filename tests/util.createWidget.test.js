import { createWidget } from '../src/util/createWidget';
import { Component } from 'preact';

class TestComponentBase extends Component {
  render() {}
  onMount() {}
}

describe('Component widget API', () => {
  test('createWidget returns a factory function', () => {
    expect(typeof createWidget(TestComponentBase)).toBe('function');
  });

  test('createWidget factory function inherits component prototype', () => {
    class TestComponent extends TestComponentBase {
      prototypeMethod1() {}
      prototypeMethod2() {}
    }
    const widget = createWidget(TestComponent);
    expect(widget.prototype).toBe(TestComponent.prototype);
  });

  test('createWidget factory function exposes base component on __component', () => {
    const widget = createWidget(TestComponentBase);
    expect(widget['__component']).toBe(TestComponentBase);
  });

  test('createWidget factory successfully creates new component instance', done => {
    class TestComponent extends TestComponentBase {
      constructor(props) {
        super(props);
        done();
      }
    }
    const widget = createWidget(TestComponent);
    const root = document.createElement('div');
    new widget(root, {});
  });

  test('createWidget factory calls components onMount() method', done => {
    class TestComponent extends TestComponentBase {
      onMount() {
        done();
      }
    }
    const widget = createWidget(TestComponent);
    const root = document.createElement('div');
    new widget(root, {});
  });

  test('createWidget factory calls components render() method', done => {
    class TestComponent extends TestComponentBase {
      render() {
        done();
      }
    }
    const widget = createWidget(TestComponent);
    const root = document.createElement('div');
    new widget(root, {});
  });

  test('createWidget factory passes container to components onMount() method', done => {
    const root = document.createElement('div');
    class TestComponent extends TestComponentBase {
      onMount(container) {
        expect(container).toBe(root);
        done();
      }
    }
    const widget = createWidget(TestComponent);
    new widget(root, {});
  });

  test('createWidget factory mounts component into container', done => {
    const root = document.createElement('div');
    class TestComponent extends TestComponentBase {
      onMount(container) {
        expect(this.base.parentNode).toBe(container);
        done();
      }
    }
    const widget = createWidget(TestComponent);
    new widget(root, {});
  });


  test('createWidget factory supports CSS selectors as a mount point', done => {
    const root = document.createElement('div');
    root.id = 'test';
    document.body.appendChild(root);
    class TestComponent extends TestComponentBase {
      onMount(container) {
        expect(container).toBe(root);
        done();
      }
    }
    const widget = createWidget(TestComponent);
    new widget('#test', {});
  });

  test('createWidget factory passes config object to component props', done => {
    const widgetProps = {
      prop1: 'prop1',
      prop2: 'prop2',
    };
    class TestComponent extends TestComponentBase {
      constructor(props) {
        super(props);
        expect(props.prop1).toBe(widgetProps.prop1);
        expect(props.prop2).toBe(widgetProps.prop2);
        done();
      }
    }
    const widget = createWidget(TestComponent);
    const root = document.createElement('div');
    new widget(root, widgetProps);
  });

  test('createWidget factory still passes component props if no config object is provided', done => {
    class TestComponent extends TestComponentBase {
      constructor(props) {
        super(props);
        expect(typeof props).toBe('object');
        done();
      }
    }
    const widget = createWidget(TestComponent);
    const root = document.createElement('div');
    new widget(root);
  });
});