export function usePlugins(core) {
  const installedPlugins = [];
  
  core.use = function(plugin, pluginOptions = {}) { 
    // Check that the plugin hasn't already been registered
    if (!installedPlugins.indexOf(plugin) > -1) {
      // Init plugin
      // TODO: consider collection of plugin utils, which are passed as a thrid param
      plugin(core, pluginOptions);
      // Register plugin
      installedPlugins.push(plugin);
    }
  }

  return core;
}