/**
 * iro.js plugins API
 * This provides the iro.use method, which can be used to register plugins which extend the iro.js core
 */
export function usePlugins(core) {
  const installedPlugins = [];
  
  /**
   * @desc Register iro.js plugin
   * @param {Function} plugin = plugin constructor
   * @param {Object} pluginOptions = plugin options passed to constructor
   */
  core.use = function(plugin, pluginOptions = {}) {
    // Check that the plugin hasn't already been registered
    if (!(installedPlugins.indexOf(plugin) > -1)) {
      // Init plugin
      // TODO: consider collection of plugin utils, which are passed as a thrid param
      plugin(core, pluginOptions);
      // Register plugin
      installedPlugins.push(plugin);
    }
  }

  core.installedPlugins = installedPlugins;

  return core;
}