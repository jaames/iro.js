<template>
  <main class="Home" aria-labelledby="main-title">
    <a href="https://github.com/jaames/iro.js" class="GithubCorner" title="View on GitHub">
      <img svg-inline class="GithubCorner__svg" src="@icon/github-corner.svg" alt="GitHub Logo"/>
    </a>
    <Hero>
      <ColorPicker :color="color" @onChange="updateColor"/>
    </Hero>
    <section class="Section">
      <div class="Section__head">
        <h2 class="Section__title">Features</h2>
      </div>
      <FeatureHighlight>
        <template v-slot:header>
          <h3>Create the perfect color picker from a selection of built-in UI components -- and add your own.</h3>
          <div class="ButtonGroup">
            <div class="Button">Full Demo</div>
            <div class="Button">Learn More</div>
          </div>
        </template>
        <template v-slot:content>
          <ComponentDemo :color="color" @onChange="updateColor"/>
        </template>
      </FeatureHighlight>
      <FeatureHighlight reverse>
        <template v-slot:header>
          <h3>Out-of-the-box support for colors in HEX, RGB, HSV, HSL and kelvin temperature formats in one simple, frictionless API.</h3>
          <div class="ButtonGroup">
            <div class="Button">Full Demo</div>
            <div class="Button">Learn More</div>
          </div>
        </template>
        <template v-slot:content>
          <FormatDemo :color="color" @onChange="updateColor"/>
        </template>
      </FeatureHighlight>
      <FeatureHighlight column>
        <template v-slot:content>
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
        </template>
      </FeatureHighlight>
    </section>
    <section class="Section">
      <div class="Section__head">
        <h2 class="Section__title">Ecosystem</h2>
      </div>
      <div class="RepoGrid">
        <GithubCard author="jaames" repo="iro.js">
          The original standalone version of iro.js that works in any webpage.
        </GithubCard>
        <GithubCard author="irojs" repo="react-iro-color-picker">
          Port of iro.js for React 16+
        </GithubCard>
        <GithubCard author="irojs" repo="vue-iro-color-picker"/>
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
    <section class="Section">
      <div class="Author">
        <img class="Author__img" src="@icon/james-avatar.png" alt="">
        <div class="Author__bio">
          <h5 class="Author__name">Built by <a>James Daniel</a></h5>
          <ul class="Author__linkGroup">
            <a class="Author__link" href="mailto" title="Email me">
              <img svg-inline class="Author__linkIcon" src="@icon/envelope.svg" alt="Email icon"/>
            </a>
            <a class="Author__link" href="https://github.com/jaames" title="@jaames on GitHub">
              <img svg-inline class="Author__linkIcon" src="@icon/github-alt.svg" alt="GitHub icon"/>
            </a>
            <a class="Author__link" href="https://twitter.com/rakujira" title="@rakujira on Twitter">
              <img svg-inline class="Author__linkIcon" src="@icon/twitter-alt.svg" alt="Twitter icon"/>
            </a>
            <a class="Author__link" href="https://dribbble.com/jaames" title="@jaames on Dribbble">
              <img svg-inline class="Author__linkIcon" src="@icon/dribbble.svg" alt="Dribbble icon"/>
            </a>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Hero from './Hero';
import FeatureHighlight from './FeatureHighlight';
import ColorPicker from "./ColorPicker";
import ComponentDemo from "./ComponentDemo";
import FormatDemo from "./FormatDemo";
import GithubCard from "./GithubCard";
import Tutorial from "./Tutorial";

export default {
  components: {
    Hero,
    FeatureHighlight,
    ColorPicker,
    ComponentDemo,
    FormatDemo,
    GithubCard,
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

h2, h3 {
  background: linear-gradient(45deg, $text-invert, $text-invert-alt);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Home {
  margin: $main-frame-padding-mobile;
  border-radius: $main-frame-radius;
  color: $text-invert;
  background: $background-invert;
  border-radius: 16px;
  box-shadow: 0 10px 15px -5px rgba(32,32,64,.25);
  z-index: 100;
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  @media (min-width: $breakpoint-medium) {
    margin: $main-frame-padding;
  }
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
  // max-width: 420px;
  padding: 0 12px;
  margin: 0 auto;

  @media (min-width: $breakpoint-medium) {
    max-width: 960px;
  }
}

.Title {
  text-align: center;
  display: inline-block;
  margin: 0 auto;
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
  font-size: 1.8rem;
}

.FeatureGrid {
  width: 100%;
  background: linear-gradient(45deg, $text-invert, $text-invert-alt);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 24px;
  text-align: left;
}

.RepoGrid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 24px;
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
  font-size: 1rem;
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

.Author {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  color: mix($text-invert, $text-invert-alt, 50%);
  background-color: $background-invert-alt;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
  display: flex;
  align-items: center;
}

.Author__img {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 18px;
}

.Author__linkGroup {
  display: flex;
  list-style-type: none;
}

.Author__link {
  margin-right: 9px;
  color: inherit;
  &:hover {
    color: $text-invert;
  }
}

.Author__linkIcon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

</style>
