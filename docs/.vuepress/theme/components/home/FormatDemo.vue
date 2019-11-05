<template>
  <div class="FormatDemo">
    <div class="FormatDemo__picker" ref="container"></div>
    <div>
      {{ hexString }}
    </div>
    <div>
      h {{ Math.round(hsv.h) }} s {{ Math.round(hsv.s) }} v {{ Math.round(hsv.v) }}
    </div><div>
      h {{ Math.round(hsl.h) }} s {{ Math.round(hsl.s) }} l {{ Math.round(hsl.l) }}
    </div><div>
      r {{ Math.round(rgb.r) }} g {{ Math.round(rgb.g) }} b {{ Math.round(rgb.b) }}
    </div><div>
      k {{ Math.round(kelvin) }}
    </div>
  </div>
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
  data: () => ({
    hexString: '',
    hsv: {h: '', s: '', v: ''},
    hsl: {h: '', s: '', l: ''},
    rgb: {r: '', g: '', b: ''},
    kelvin: 0
  }),
  mounted() {
    // https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
    import('@js/iro.es.js').then(module => {
      const iro = module.default;

      this.colorPicker = new iro.ColorPicker(this.$refs.container, {
        color: this.color,
        sliderMargin: 16,
        markerRadius: 10,
        borderWidth: 2,
        padding: 6,
        borderColor: "#fff",
        width: 200,
        css: {
          ":root": {
            "--bgcolor": "$color",
          }
        },
        layoutDirection: 'horizontal',
        layout: [
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
          }
        ]
      });

      this.colorPicker.on('input:change', (color) => {
        this.$emit('onChange', color);  
      });

      this.colorPicker.on(['color:init', 'color:change'], (color) => {
        this.hsv = color.hsv;
        this.hsl = color.hsl;
        this.rgb = color.rgb;
        this.hexString = color.hexString;
        this.kelvin = color.kelvin;
      });

    });
  }
}
</script>

<style lang="scss">

  .FormatDemo .IroColorPicker {
    display: grid !important;
    grid-template-columns: repeat(3, min-content);
    grid-gap: 18px;
  }

  .FormatDemo {
    .IroWheel, .IroSlider, .IroBox {
      margin: 0 !important;
    }
  }

</style>