<template>
  <div class="home">
    <div class="hero">
      <div class="hero__content">
        <div class="hero__half">
          iro js
        </div>
        <div class="hero__half">
          iro js
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import iro from "./js/iro.es.js";

export default {
  computed: {
    data () {
      return this.$page.frontmatter
    }
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

.navbar {
  display: none;
}

.hero {
  background: #906BFF;
  width: 100vw;
  height: 100vh;
  padding: 48px;
  display: flex;
}

.hero__content {
  background: #171F30;
  color: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px -5px rgba(0,0,0,0.25);
  flex: 1 1;
  display: flex;
  flex-direction: row-reverse;
}

.hero__half {
  flex: 1 1;
  flex-basis: 50%;
}

</style>
