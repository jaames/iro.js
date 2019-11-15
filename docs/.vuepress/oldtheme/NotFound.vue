<template>
  <div class="notfound"> 
    <h1>404</h1> 
    <div class="subtitle">Page not found</div>
    <color-picker/>
    <div class="linkgroup">
      <router-link class="link" to="/">Home</router-link> | <a class="link" href="//github.com/jaames/iro.js">GitHub</a> | <a class="link" href="//github.com/jaames/iro.js/issues">Report Issue</a>
    </div>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";
export default {
  components: {
    ColorPicker
  }
}
</script>
