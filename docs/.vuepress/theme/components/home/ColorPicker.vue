<template>
  <div class="BasicDemo" ref="container"></div>
</template>

<script>
export default {
  props: {
    color: Object,
  },
  watch: {
    color(newColor) {
      this.colorPicker.color.set(newColor);
    }
  },
  mounted() {
    // https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
    import('@js/iro.es.js').then(module => {
      const iro = module.default;

      this.colorPicker = new iro.ColorPicker(this.$refs.container, {
        color: this.color,
        sliderMargin: 24,
        markerRadius: 10,
        borderWidth: 2,
        padding: 8,
        borderColor: "#fff",
        wheelAngle: 120,
        wheelDirection: "clockwise",
        width: 270,
      });

      this.colorPicker.on(['color:init', 'input:change'], (color) => {
        this.$emit('onChange', color);
      });
      // expose iro globally incase people wanna use devtools to play with it
      window.colorPicker = this.colorPicker;
      window.iro = iro;
    });
  }
}
</script>
