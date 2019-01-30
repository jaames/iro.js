import {
  usePlugins
} from '../src/util/usePlugins';

describe('Plugin API', () => {

  test('usePlugins helper correctly extends iro core', () => {
    const iro = usePlugins({});
    expect('use' in iro).toBeTruthy();
    expect('installedPlugins' in iro).toBeTruthy();
  });

  test('Plugins can be registered', () => {
    const iro = usePlugins({});
    const plugin = function() {}
    iro.use(plugin);
    expect(iro.installedPlugins[0]).toBe(plugin);
  });
  
  test('Plugins cannot be registered more than once', () => {
    const iro = usePlugins({});
    const plugin = function() {}
    iro.use(plugin);
    iro.use(plugin);
    expect(iro.installedPlugins.length).toBe(1);
  });
  
  test('Plugins are called as functions', done => {
    const iro = usePlugins({});
    const plugin = function() {
      done();
    }
    iro.use(plugin);
  });

  test('Plugins receive the core object as their first param', done => {
    const iro = usePlugins({});
    const plugin = function(core) {
      expect(core).toBe(iro);
      done();
    }
    iro.use(plugin);
  });

  test('Plugins receive an emtpy config object by default', done => {
    const iro = usePlugins({});
    const plugin = function(core, config) {
      expect(config).toMatchObject({});
      done();
    }
    iro.use(plugin);
  });
  
  test('Plugins receive config object passed to use()', done => {
    const iro = usePlugins({});
    const pluginConfig = {
      test: 'test',
    };
    const plugin = function(core, config) {
      expect(config).toMatchObject(pluginConfig);
      done();
    }
    iro.use(plugin, pluginConfig);
  });

});

