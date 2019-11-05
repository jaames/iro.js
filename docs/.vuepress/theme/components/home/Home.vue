<template>
  <main class="Home" aria-labelledby="main-title">
    <a href="https://github.com/jaames/iro.js" class="GithubCorner" title="View on GitHub">
      <img svg-inline class="GithubCorner__svg" src="@svg/github-corner.svg" alt="GitHub Logo"/>
    </a>
    <header class="Hero">
      <div class="Hero__head"></div>
      <div class="Hero__body">
        <div class="Hero__demo">
          <ColorPicker :color="color" @onChange="updateColor"/>
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
    <section class="Section">
      <div class="Section__head">
        <h2 class="Section__title">Features</h2>
      </div>
      <div class="FeatureHighlight">
        <div class="FeatureHighlight__main">
          <h3 class="FeatureHighlight__title">Create the perfect color picker from a selection of built-in UI components -- and add your own.</h3>
          <div class="ButtonGroup">
            <div class="Button">Full Demo</div>
            <div class="Button">Learn More</div>
          </div>
        </div>
        <div class="FeatureHighlight__secondary">
          <ComponentDemo :color="color" @onChange="updateColor"/>
        </div>
      </div>
      <div class="FeatureHighlight FeatureHighlight--reverse">
        <div class="FeatureHighlight__main">
          <h3 class="FeatureHighlight__title">Out-of-the-box support for colors in HEX, RGB, HSV, HSL and kelvin temperature formats in one simple, frictionless API.</h3>
          <div class="ButtonGroup">
            <div class="Button">Full Demo</div>
            <div class="Button">Learn More</div>
          </div>
        </div>
        <div class="FeatureHighlight__secondary">
          <FormatDemo :color="color" @onChange="updateColor"/>
        </div>
      </div>
      <div class="FeatureHighlight FeatureHighlight--column">
        <div class="FeatureHighlight__main">
        </div>
        <div class="FeatureHighlight__secondary">
          <div class="FeatureGrid">
            <div class="FeatureItem">
              <h4>Works with any project</h4>
              <p>Lightweight components are available for apps built with React or Vue, and a vanilla JS version for anything else.</p>
            </div>
            <div class="FeatureItem">
              <h4>One script</h4>
              <p>All of iro.js is contained within a single script. No extra CSS or images necessary, and absolutely no jQuery.</p>
            </div>
            <div class="FeatureItem">
              <h4>Light footprint</h4>
              <p>Vanilla iro.js is less than 9.5kB minified &amp; gzipped, and the React and Vue versions are even smaller.</p>
            </div>
            <div class="FeatureItem">
              <h4>Extendable</h4>
              <p>Vanilla iro.js can be extended with <a>plugins</a></p>
            </div>
            <div class="FeatureItem">
              <h4>Perfect for lighting</h4>
              <p>iro.js provides the perfect UI for controlling RGB lighting in LED drivers and smart home applications</p>
            </div>
            <div class="FeatureItem">
              <h4>100% free</h4>
              <p>Everything is licenced under MPL 2.0 and is completely free for commercial or personal projects.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="Section">
      <div class="Section__head">
        <h2 class="Section__title">Get Started</h2>
      </div>
      <Tutorial :tabs="['iro.js', 'react-iro', 'vue-iro']" defaultTab="iro.js">
        <template v-slot:iro.js>
          <Content slot-key="tutorial-iro-js"/>
        </template>
        <template v-slot:react-iro>
          <Content slot-key="tutorial-react-iro"/>
        </template>
        <template v-slot:vue-iro>
          <Content slot-key="tutorial-vue-iro"/>
        </template>
      </Tutorial>
    </section>
  </main>
</template>

<script>
import ColorPicker from "./ColorPicker";
import ComponentDemo from "./ComponentDemo";
import FormatDemo from "./FormatDemo";
import Tutorial from "./Tutorial";

export default {
  components: {
    ColorPicker,
    ComponentDemo,
    FormatDemo,
    Tutorial
  },
  data: () => ({
    color: {h: 255, s: 58, v: 100}
  }),
  methods: {
    updateColor(color) {
      this.color = color.hsv;
      document.body.style.backgroundColor = color.hexString;
    }
  }
}
</script>

<style lang="scss">

@import '@styles/config.scss';

.GetStartedTabs {
  display: flex;
  background: $background-invert-alt;
}

.GetStartedTabs__tab {
  flex: 1;
}

h2, h3 {
  background: linear-gradient(45deg, $text-invert, $text-invert-alt);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Home {
  margin: $main-frame-padding;
  border-radius: $main-frame-radius;
  color: $text-invert;
  background: $background-invert;
  border-radius: 8px;
  box-shadow: 0 10px 15px -5px rgba(32,32,64,.25);
  z-index: 100;
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.GithubCorner {
  position: absolute;
  top: -10px;
  right: -10px;
  transition: transform 0.2s;
  display: block;
  width: 120px;
  height: 120px;

  .GithubCorner__svg {
    stroke-width: 2px;
    stroke: $text-invert;
    width: 120px;
    height: 120px;
  }

  &:hover {
    transform: translate(-8px, 8px);
  }
}

.Wrap {
  width: 100%;
  max-width: 960px;
  padding: 0 8px;
  margin: 0 auto;
}

.Title {
  text-align: center;
  display: inline-block;
  margin: 0 auto;
}

.Hero {
  @extend .Wrap;
  display: flex;
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
  align-items: flex-end;
}

.Hero__demo {
  flex: 1;
}

.Hero__intro {
  flex: 1;
}

.Hero__title {
  font-weight: 700;
  font-size: 52px;
  margin-bottom: 22px;
  line-height: 1;

  sub {
    color: $text-invert-alt;
    font-size: 22px;
    font-weight: 400;
    bottom: 0;
    margin-left: .5em;
  }
}

.Hero__subtitle {
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 22px;
}

.Section {
  @extend .Wrap;
  padding-top: 2rem;
  padding-bottom: 8rem;
}

.Section__head {
  text-align: center;
  padding-bottom: 2.5rem;
}

.Section__title {
  display: inline;
  font-size: 32px;
}

.FeatureHighlight {
  display: flex;
  padding-top: 5rem;
  padding-bottom: 5rem;
  align-items: center;
}

.FeatureHighlight__title {
  font-size: 22px;
  margin-bottom: 18px;
}

.FeatureHighlight__main {
  flex: 1;
}

.FeatureHighlight__secondary {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.FeatureHighlight.FeatureHighlight--reverse {
  flex-direction: row-reverse;

  .FeatureHighlight__secondary {
    justify-content: flex-start;
  }
}

.FeatureHighlight.FeatureHighlight--column {
  display: block;
  text-align: center;

  .FeatureHighlight__secondary {
    justify-content: center;
  }
}

.FeatureGrid {
  background: linear-gradient(45deg, $text-invert, $text-invert-alt);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  text-align: left;
}

.Button {
  color: $text-invert;
  height: 42px;
  border: 2px solid rgb(192, 196, 216);
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-size: 18px;
  transition: color .2s, border-color .2s;

  &:hover {
    color: $text-invert;
    border-color: $text-invert-alt;
  }
}

.ButtonGroup {
  display: flex;
  flex-wrap: wrap;
  margin:-9px;

  .Button {
    margin: 9px;
  }
}


</style>
