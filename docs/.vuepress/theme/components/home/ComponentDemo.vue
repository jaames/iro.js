<template>
  <div class="ComponentDemo" ref="container"></div>
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
        sliderMargin: 16,
        markerRadius: 8,
        borderWidth: 2,
        padding: 6,
        borderColor: "#fff",
        wheelAngle: 120,
        wheelDirection: "clockwise",
        width: 192,
        css: {
          ":root": {
            "--bgcolor": "$color",
          }
        },
        layoutDirection: 'horizontal',
        layout: [
          {
            component: iro.ui.Wheel,
            options: {}
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'hue',
            }
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'saturation',
            }
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'value',
            }
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'alpha',
            }
          },
          {
            component: iro.ui.Box,
            options: {}
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'kelvin',
              sliderShape: 'circle'
            }
          }
        ]
      });

      this.colorPicker.on('input:change', (color) => {
        this.$emit('onChange', color);
      });

    });
  }
}
</script>

<style lang="scss">

  .ComponentDemo .IroColorPicker {
    display: grid !important;
    grid-template-columns: repeat(5, min-content);
    grid-gap: 18px;
  }

  .ComponentDemo {
    .IroWheel, .IroSlider, .IroBox {
      margin: 0 !important;
    }
  }

  .ComponentDemo .IroSlider:last-of-type {
    grid-column-start: 2;
    grid-column-end: 6;
  }

</style>