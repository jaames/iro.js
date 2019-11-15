<template>
  <header class="Hero">
    <div class="Hero__head"></div>
    <div class="Hero__body">
      <div class="Hero__demo">
        <slot></slot>
      </div>
      <div class="Hero__intro">
        <h1 class="Hero__title">iro.js<sub>v5</sub></h1>
        <h2 class="Hero__subtitle">A modern, SVG-based color picker for vanilla JS, React and Vue.</h2>
        <div class="ButtonGroup">
          <a href="https://github.com/jaames/iro.js" class="Button">GitHub</a>
          <router-link class="Button" to="/introduction.html">Documentation →</router-link>
        </div>
      </div>
    </div>
    <div class="Hero__foot"></div>
  </header>
</template>

<style lang="scss">
  @import '@styles/config.scss';

  .Hero {
    // @extend .Wrap;
    display: flex;
    max-width: $mobile-wrapper-width;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    min-height: calc(100vh - #{$main-frame-padding * 2});
  }

.Hero__head, .Hero__foot {
  flex: 1 1 200px;
}

.Hero__foot {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}

.Hero__body {
  display: flex;
  flex-direction: column-reverse;
}

.Hero__title {
  font-weight: 700;
  // font-size: 52px;
  margin-bottom: 22px;
  line-height: 1;

  sub {
    color: $text-invert-alt;
    font-size: .5em;
    font-weight: 400;
    bottom: 0;
    margin-left: .5em;
  }
}

.Hero__subtitle {
  font-weight: 700;
  margin-bottom: 22px;
}

.Hero__intro {
  text-align: center;
  .ButtonGroup {  
    justify-content: center;
  }
}

@media (min-width: $breakpoint-medium) {
  .Hero {
    max-width: $wrapper-width;
  }
  .Hero__body {
    align-items: flex-end;
    flex-direction: row;
  }

  .Hero__demo {
    flex: 1;
  }

  .Hero__intro {
    flex: 1;
    text-align: left;
    
    .ButtonGroup {
      justify-content: flex-start;
    }
  }
}

</style>