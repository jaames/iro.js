export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer
}) => {
  Vue.config.devtools = true
  // Make iro.js globally available to all client-side Vue components
  // https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
  if (!isServer) {
    // We have to go through this whole ordeal to get iro.js to load! Fun!

    const iroLoadCallbacks = [];
    let iro = null;

    Vue.prototype.$onIroReady = (fn) => { 
      if (iro !== null) {
        fn(iro);
      } else {
        iroLoadCallbacks.push(fn);
      }
    };

    import('@js/iro.es.js').then(module => {
      iro = module.default;
      window.iro = iro;
      Vue.prototype.$iro = iro;
      iroLoadCallbacks.forEach(fn => fn(iro));
      console.log("Hey there! You can play around with iro.js from the developer console if you want to! It's globally available on window.iro :)");
    });
  }
}