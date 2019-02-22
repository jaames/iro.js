<template>
  <div class="home">
    <div class="hero">
      <div class="hero__frame hero__frame--left"></div>
      <div class="hero__frame hero__frame--right"></div>
      <div class="hero__frame hero__frame--top"></div>
      <div class="hero__frame hero__frame--bottom"></div>
      <div class="hero__content">
        <a class="githubCorner" href="//github.com/jaames/iro.js" target="_blank">
          <github-corner/>
        </a>
        <div class="hero__body">
          <div class="hero__half intro">
            <Logo class="intro__logo logo"/>
            <h3 class="intro__sub">A lightweight, SVG-based color picker library</h3>
            <div class="intro__buttons">
              <a href="//codepen.io/rakujira/pen/WZOeNq?editors=0010" target="_blank" class="button button--invert">Codepen Demo</a>
              <router-link class="button button--invert" to="/introduction.html">Get Started →</router-link>
            </div>
          </div>
          <div class="hero__half demo">
            <color-picker/>
          </div>
        </div>
        <div class="hero__foot">Created by <a href="//github.com/jaames">James Daniel</a></div>
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

.hero {
  width: 100vw;
  min-height: 100vh;
  padding: $hero-frame-padding-mobile;
  display: flex;
  position: relative;

  @media (min-width: $breakpoint-large) {
    padding: $hero-frame-padding;
  }
}

.hero__frame {
  background-color: var(--bgcolor, $primary-color);
  // neat gradient effect, but causes performance dips :<
  // background-image: linear-gradient(#fff, #c1d5f1);
  // background-attachment: fixed;
  // background-blend-mode: multiply;
  will-change: background;
  position: absolute;
  z-index: 0;
}

.hero__frame--left, .hero__frame--right {
  top: 0;
  bottom: 0;
  width: $hero-frame-padding-mobile + $hero-frame-radius;
}

.hero__frame--top, .hero__frame--bottom {
  left: 0;
  right: 0;
  height: $hero-frame-padding-mobile + $hero-frame-radius;
}

@media (min-width: $breakpoint-medium) {
  .hero__frame--left, .hero__frame--right {
    width: $hero-frame-padding + $hero-frame-radius;
  }

  .hero__frame--top, .hero__frame--bottom {
    height: $hero-frame-padding + $hero-frame-radius;
  }
}

.hero__frame--left {
  left: 0;
}

.hero__frame--right {
  right: 0;
}

.hero__frame--top {
  top: 0;
}

.hero__frame--bottom {
  bottom: 0;
}

.hero__content {
  color: $text-invert;
  background: $background-invert;
  border-radius: $hero-frame-radius;
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

.hero__body {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: $breakpoint-medium) {
    flex-direction: row-reverse;
  }
  @media (min-width: $breakpoint-large) {
    padding: 6rem;
  }
}

.hero__head, .hero__foot {
  flex: 0;
  padding: 16px 24px;
}

.hero__foot {
  // font-size: .9rem;
  color: rgba($text-invert, 0.75);
  text-align: right;

  a {
    color: $text-invert;
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
  font-size: 1.25rem;
  margin: 1em 0;
  padding-bottom: 0;
  border: 0;
}

.demo {
  padding-top: 1rem;
  justify-content: center;
  align-items: center;
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
