<template>
  <div class="home">
    <div class="main">
      <div class="main__frame main__frame--left"></div>
      <div class="main__frame main__frame--right"></div>
      <div class="main__frame main__frame--top"></div>
      <div class="main__frame main__frame--bottom"></div>
      <div class="main__content">
        <a class="githubCorner" href="//github.com/jaames/iro.js" target="_blank">
          <github-corner/>
        </a>
        <div class="hero">
          <div class="hero__half intro">
            <Logo class="intro__logo logo"/>
            <h3 class="intro__sub">An HSV color picker widget for JavaScript, with zero dependencies and a modern SVG-based UI</h3>
            <div class="intro__buttons">
              <a href="//codepen.io/rakujira/pen/WZOeNq?editors=0010" target="_blank" class="button button--invert">Codepen Demo</a>
              <router-link class="button button--invert" to="/introduction.html">Documentation →</router-link>
            </div>
          </div>
          <div class="hero__half demo">
            <color-picker/>
          </div>
        </div>
        <div class="features">
          <h3 class="features__title">Features</h3>
          <ul class="features__list">
            <li class="features__item">
              <h4>Simple</h4>
              <p>Low friction API, with robust support for hex, rgb, hsl and hsv color formats.</p>
            </li>
            <li class="features__item">
              <h4>Extendable</h4>
              <p>Tweak the library to your requirements with <router-link to="/plugins.html">Plugins</router-link> and custom UI elements.</p>
            </li>
            <li class="features__item">
              <h4>Great design</h4>
              <p>The controls are designed to be intuitive and responsive, plus they're built with SVG so they look super crisp at any resolution.</p>
            </li>
            <li class="features__item">
              <h4>Small footprint</h4>
              <p><a href="https://bundlephobia.com/result?p=@jaames/iro" target="blank">7.1kb</a> minified and gzipped, with absolutely no external dependencies, extra css/images, or jQuery in sight.</p>
            </li>
            <li class="features__item">
              <h4>Consistent behaviour</h4>
              <p>Works across all modern browsers and devices, including touchscreens.</p>
            </li>
            <li class="features__item">
              <h4>Transparency support</h4>
              <p>Optional transparency slider with the <a href="https://github.com/jaames/iro-transparency-plugin" target="blank">Transparency Plugin</a>.</p>
            </li>
            <li class="features__item">
              <h4>Licenced under MPL 2.0</h4>
              <p>100% free for personal and commercial use.</p>
            </li>
          </ul>
        </div>
        <div class="main__foot">Created by <a href="//jamesdaniel.dev">James Daniel</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./icons/logo.svg";
import GithubCorner from "./icons/github-corner.svg";
import ColorPicker from "./ColorPicker";
export default {
  components: {
    Logo, 
    GithubCorner,
    ColorPicker
  },
  computed: {
    data () {
      return this.$page.frontmatter
    }
  }
}
</script>

<style lang="scss">
@import "./styles/config";

.navbar {
  display: none;
}

.main {
  width: 100vw;
  min-height: 100vh;
  padding: $main-frame-padding-mobile;
  display: flex;
  position: relative;

  @media (min-width: $breakpoint-large) {
    padding: $main-frame-padding;
  }
}

.main__frame {
  background-color: var(--bgcolor, $primary-color);
  // neat gradient effect, but causes performance dips :<
  // background-image: linear-gradient(#fff, #c1d5f1);
  // background-attachment: fixed;
  // background-blend-mode: multiply;
  will-change: background;
  position: absolute;
  z-index: 0;
}

.main__frame--left, .main__frame--right {
  top: 0;
  bottom: 0;
  width: $main-frame-padding-mobile + $main-frame-radius;
}

.main__frame--top, .main__frame--bottom {
  left: 0;
  right: 0;
  height: $main-frame-padding-mobile + $main-frame-radius;
}

@media (min-width: $breakpoint-medium) {
  .main__frame--left, .main__frame--right {
    width: $main-frame-padding + $main-frame-radius;
  }

  .main__frame--top, .main__frame--bottom {
    height: $main-frame-padding + $main-frame-radius;
  }
}

.main__frame--left {
  left: 0;
}

.main__frame--right {
  right: 0;
}

.main__frame--top {
  top: 0;
}

.main__frame--bottom {
  bottom: 0;
}

.main__content {
  color: $text-invert;
  background: $background-invert;
  border-radius: $main-frame-radius;
  box-shadow: 0 10px 15px -5px rgba(32, 32, 64, 0.25);
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: relative;
  overflow: hidden;
  transform: translate3d(0,0,0);
  -webkit-transform: translate3d(0,0,0);
}

.main__head, .main__foot {
  flex: 0;
  padding: 16px 24px;
}

.main__foot {
  // font-size: .9rem;
  background: #1d1c3e;
  color: rgba($text-invert, 0.75);
  text-align: right;

  a {
    color: $text-invert;
  }
}

.hero {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 780px;
  margin: 0 auto;

  @media (min-width: $breakpoint-medium) {
    flex-direction: row-reverse;
  }
  @media (min-width: $breakpoint-large) {
    padding: 8rem 0;
  }
}

.hero__half {
  padding: 2rem;
  @media (min-width: $breakpoint-medium) {
    flex: 1;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: $breakpoint-large) {
    padding: 0;
  }
}

.intro {
  justify-content: center;
  align-items: flex-start;
  margin-top: 60px;
  max-width: 320px;
  @media (min-width: $breakpoint-medium) {
    max-width: none;
  }
  @media (min-width: $breakpoint-large) {
    margin-top: 90px;
  }
}

.intro__logo {
  height: 100px;
  // push alignment to left
  margin-right: auto;
}

.intro__buttons {
  padding-top: 1rem;
  margin: 0 -.5rem;
  display: flex;

  .button {
    margin: 0 .5rem;
  }
}

.intro__sub {
  font-weight: normal;
  font-size: 1.1rem;
  margin: 0;
  padding-top: 1.6rem;
  padding-bottom: .6rem;
  border: 0;
}

.demo {
  padding-top: 1rem;
  justify-content: center;
}

.features {
  padding: 4rem 2rem;
  // justify-content: space-between;
  background: #1d1d3e;
}

.features__title {
  text-align: center;
  margin-bottom: 4rem;
}

.features__list {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  display: grid;
  grid-gap: 32px 48px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  h4 {
    font-weight: normal;
    color: #fff;
  }
}

.features__item {
  // flex: 0;
  flex-basis: 50%;
}

.githubCorner {
  display: block;
  position: absolute;
  top: -5px;
  right: -5px;
}

.githubCorner__svg {
  width: 90px;
  height: 90px;
  fill: $text-invert;
  transition: transform 0.2s ease;

  .octo-arm, .octo-body {
    fill: $background-invert;
  }

  .githubCorner:hover & {
    transform: translate(-5px, 5px);
  }
}
</style>
