<template>
  <div class="ColorPicker" ref="container"></div>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      default: () => ['#f00']
    },
    width: {
      type: Number,
      default: 270,
    },
    sliderMargin: {
      type: Number,
      default: 24,
    },
    handleRadius: {
      type: Number,
      default: 9,
    },
    borderWidth: {
      type: Number,
      default: 2,
    },
    padding: {
      type: Number,
      default: 8,
    },
    layout: {
      default: null
    },
    layoutDirection: {
      type: String,
      default: 'vertical'
    },
    display: {
      type: String,
      default: 'block'
    },
    makeGlobal: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    colors(newColors) {
      const newColor = newColors[0];
      if (this.colorPicker) this.colorPicker.color.set(newColor);
    }
  },
  mounted() {
    this.$onIroReady((iro) => {
      this.colorPicker = new iro.ColorPicker(this.$refs.container, {
        width: this.width,
        colors: this.colors,
        sliderMargin: this.sliderMargin,
        handleRadius: this.handleRadius,
        padding: this.padding,
        display: this.display,
        layout: Array.isArray(this.layout) ? this.layout.map(element => {
          if (element.component)
            element.component = iro.ui[element.component];
          return element;
        }): null,
        layoutDirection: this.layoutDirection,
        borderWidth: 2,
        borderColor: '#fff',
        wheelAngle: 120,
        wheelDirection: 'clockwise',
      });

      this.colorPicker.on(['color:init', 'input:change'], (color) => {
        this.$emit('onColorChange', color);
      });

      if (this.makeGlobal) {
        // expose picker globally incase people wanna use devtools to play with it
        window.colorPicker = this.colorPicker;
      }
    });
  }
}
</script>

<style scoped>
.ColorPicker {
  /* display: inline-block; */
}
</style>