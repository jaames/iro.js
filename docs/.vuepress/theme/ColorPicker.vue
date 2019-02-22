<template>
  <div ref="container"></div>
</template>


<script>
export default {
  mounted() {
    // https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
    Promise.all([
      import('./js/iro.es.js'),
      import('iro-dynamic-css'),
    ]).then(modules => {
      const iro = modules[0].default;
      const iroDynamicCss = modules[1].default;
      iro.use(iroDynamicCss, {throttle: 50});

      this.wheel = new iro.ColorPicker(this.$refs.container, {
        sliderMargin: 24,
        markerRadius: 8,
        borderWidth: 2,
        borderColor: "#fff",
        width: 260,
        color: "#906bff",
        css: {
          ":root": {
            "--bgcolor": "$color",
          }
        }
      });
      // expose iro globally incase people wanna use devtools to play with it
      window.colorPicker = this.wheel;
      window.iro = iro;
    });
  }
}
</script>
