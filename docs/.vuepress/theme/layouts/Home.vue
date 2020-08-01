<template>
  <main class="Home" aria-labelledby="main-title">
    <a href="https://github.com/jaames/iro.js" class="GithubCorner" title="View on GitHub">
      <img svg-inline class="GithubCorner__svg" src="@icon/github-corner.svg" alt="GitHub Logo"/>
    </a>
    <div class="HomeLanguageSelect">
      <LanguageSelect/>
    </div>
    <header class="Hero">
      <div class="Hero__head"></div>
      <div class="Hero__body">
        <div class="Hero__demo">
          <ColorPicker
            class="BasicDemo"
            :colors="[color]"
            :make-global="true"
            @onColorChange="updateColor"
          />
        </div>
        <div class="Hero__intro">
          <h1 class="Hero__title">
            iro.js<sub>v5</sub>
          </h1>
          <h2 class="Hero__subtitle">
            <Content slot-key="introduction" rgbString="beans"/>
          </h2>
          <div class="ButtonGroup">
            <a href="https://github.com/jaames/iro.js" class="Button">GitHub<span class="Button__starcount">★ {{ githubStarCount }}</span></a>
            <router-link class="Button" to="./guide.html">Get Started →</router-link>
          </div>
        </div>
      </div>
      <div class="Hero__foot"></div>
    </header>
    <section class="Section">
      <div class="Section__head">
        <h2 class="Section__title">Features</h2>
      </div>
      <FeatureHighlight reverse>
        <template v-slot:header>
          <h3>Work with colors in hex, RGB, HSV and HSL formats (plus kelvin temperatures!) in one simple, frictionless API.</h3>
          <div class="ButtonGroup">
            <a class="Button" href="https://codepen.io/rakujira/pen/WZOeNq?editors=0010">Full Demo</a>
            <router-link class="Button" to="./guide.html#working-with-colors">Learn More →</router-link>
          </div>
        </template>
        <template v-slot:content>
          <div class="FormatDemo">
            <div class="FormatDemo__readout">
              <div class="language-js">
<code class="language-js">
<span class="token comment">// Get the color as an RGB string</span>
</br><span class="token keyword">var</span> rgb <span class="token operator">=</span> <span class="token class-name">colorPicker<span class="token punctuation">.</span>color</span><span class="token punctuation">.</span>rgbString<span class="token punctuation">;</span>
</br><span class="token comment">// rgb = "{{ rgbString }}"</span>
</br></br><span class="token comment">// Get the color as a HSV object</span>
</br><span class="token keyword">var</span> hsv <span class="token operator">=</span> <span class="token class-name">colorPicker<span class="token punctuation">.</span>color</span><span class="token punctuation">.</span>hsv<span class="token punctuation">;</span>
</br><span class="token comment">// hsv = { h: {{ hsv.h | formatInt }}, s: {{ hsv.s | formatInt }}, v: {{ hsv.v | formatInt }} }</span>
</br></br><span class="token comment">// Set the color from a hex string</span>
</br><span class="token class-name">colorPicker<span class="token punctuation">.</span>color</span><span class="token punctuation">.</span>hexString <span class="token operator">=</span> <span class="token string">"#fff"</span>;
</br><span class="token comment">// Set the color from a temperature</span>
</br><span class="token class-name">colorPicker<span class="token punctuation">.</span>color</span><span class="token punctuation">.</span>kelvin <span class="token operator">=</span> <span class="token number">6000</span>;
</code>
              </div>
            </div>
          </div>
        </template>
      </FeatureHighlight>

      <FeatureHighlight>
        <template v-slot:header>
          <h3>Add multiple colors to the same color picker for selecting color harmonies and themes.</h3>
          <div class="ButtonGroup">
            <a class="Button" href="https://codepen.io/rakujira/pen/bGddRyq?editors=0010">Full Demo</a>
            <router-link class="Button" to="./advanced.html#multi-color-selections">Learn More →</router-link>
          </div>
        </template>
        <template v-slot:content>
          <ColorPicker
            class="MultiColorDemo"
            :colors="[
              color, 
              {h: 120, s: 33, v: 33}, 
              {h: 240, s: 66, v: 66}
            ]"
            display="block"
            layoutDirection="horizontal"
            :layout="[
              {
                component: 'Box',
              },
              {
                component: 'Slider',
                options: {
                  sliderType: 'hue',
                }
              },
            ]"
            @onColorChange="updateColor"
          />
        </template>
      </FeatureHighlight>
      <FeatureHighlight reverse>
        <template v-slot:header>
          <h3>Create the perfect color picker from a selection of pre-built UI components.</h3>
          <div class="ButtonGroup">
            <a class="Button" href="https://codepen.io/rakujira/pen/XWbgwYm?editors=1011">Full Demo</a>
            <router-link class="Button" to="./advanced.html#ui-components">Learn More →</router-link>
          </div>
        </template>
        <template v-slot:content>
          <ColorPicker
            class="ComponentDemo"
            :width="198"
            :padding="6"
            :colors="[
              color, 
            ]"
            display="block"
            layoutDirection="horizontal"
            :layout="[
              {
                component: 'Wheel',
                options: {}
              },
              {
                component: 'Slider',
                options: {
                  sliderType: 'hue',
                }
              },
              {
                component: 'Slider',
                options: {
                  sliderType: 'saturation',
                }
              },
              {
                component: 'Slider',
                options: {
                  sliderType: 'value',
                }
              },
              {
                component: 'Slider',
                options: {
                  sliderType: 'alpha',
                }
              },
              {
                component: 'Box',
                options: {}
              },
              {
                component: 'Slider',
                options: {
                  sliderType: 'kelvin',
                  sliderShape: 'circle'
                }
              }
            ]"
            @onColorChange="updateColor"
          />
        </template>
      </FeatureHighlight>
      <FeatureHighlight column>
        <template v-slot:header>
          <h3>And more!</h3>
        </template>
        <template v-slot:content>
          <div class="FeatureGrid">
            <div class="FeatureItem">
              <h4>No externals</h4>
              <p>All of iro.js can run from a single script - no extra CSS, images, or third-party libraries required.</p>
            </div>
            <div class="FeatureItem">
              <h4>Perfect for LED control</h4>
              <p>iro.js provides the perfect UI for controlling RGB lighting within smart home applications.</p>
            </div>
            <div class="FeatureItem">
              <h4>100% free</h4>
              <p>Everything is licensed under MPL 2.0, so it's completely free to use in commercial and personal projects.</p>
            </div>
          </div>
        </template>
      </FeatureHighlight>
    </section>
    <!-- <section class="Section">
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
    </section> -->
    <section class="Section">
      <div class="Section__head">
        <h2 class="Section__title">Get Started</h2>
      </div>
      <Tutorial :use-tabs="false" class="GetStartedTutorial">
        <template>
          <LanguageSelect class="GetStartedTutorial__language"/>
          <Content slot-key="tutorial-iro-js"/>
        </template>
      </Tutorial>
      <!-- <Tutorial :tabs="['iro.js', 'react-iro', 'vue-iro']" default-tab="iro.js">
        <template v-slot>
          <Content slot-key="tutorial-iro-js"/>
        </template>
        <template v-slot:react-iro>
          <Content slot-key="tutorial-react-iro"/>
        </template>
        <template v-slot:vue-iro>
          <Content slot-key="tutorial-vue-iro"/>
        </template>
      </Tutorial> -->
    </section>
    <footer class="Section Footer">
      <div class="Footer__column">
        <div class="Sponsors">
          <h5 class="Sponsors__title">Sponsored by</h5>
          <a href="https://shipshape.io/" title="iro.js is sponsored by Ship Shape">
            <img svg-inline class="Sponsors__icon Sponsors__icon--shipshape" src="@icon/shipshape.svg" alt="Shipshape Logo"/>
          </a>
          <a class="Sponsors__link" href="https://github.com/sponsors/jaames" title="Sponsor @jaames on Github">Become a sponsor →</a>
        </div>
      </div>
      <div class="Footer__column">
        <div class="Author">
          <div class="Author__imgOuter">
            <img class="Author__img" src="@icon/james-avatar.png" alt="">
          </div>
          <div class="Author__bio">
            <h6 class="Author__name">Built by <a href="https://jamesdaniel.dev" title="James Daniel">James Daniel</a></h6>
            <p class="Author__desc">Freelance web dev, designer and 3D artist from the North West of England.</p>
            <ul class="Author__linkGroup">
              <a class="Author__link" href="https://github.com/jaames" title="@jaames on GitHub">
                <img svg-inline class="Author__linkIcon" src="@icon/github-alt.svg" alt="GitHub icon"/>
              </a>
              <a class="Author__link" href="https://twitter.com/rakujira" title="@rakujira on Twitter">
                <img svg-inline class="Author__linkIcon" src="@icon/twitter-alt.svg" alt="Twitter icon"/>
              </a>
              <!-- <a class="Author__link" href="https://dribbble.com/jaames" title="@jaames on Dribbble">
                <img svg-inline class="Author__linkIcon" src="@icon/dribbble.svg" alt="Dribbble icon"/>
              </a> -->
              <a class="Author__link" href="mailto:irojs@jamesdaniel.dev" title="Email me">
                <img svg-inline class="Author__linkIcon" src="@icon/envelope.svg" alt="Email icon"/>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>

<script>
import axios from 'axios';
import FeatureHighlight from '@components/HomepageFeatureHighlight';
import LanguageSelect from '@components/LanguageSelect';
// import ColorPicker from '@components/ColorPicker';
// import GithubCard from "./GithubCard";
import Tutorial from '@components/HomepageGuide';

export default {
  components: {
    FeatureHighlight,
    LanguageSelect,
    // ColorPicker,
    // GithubCard,
    Tutorial
  },
  data: () => ({
    color: {h: 255, s: 58, v: 100},
    hexString: '',
    rgbString: '',
    hsv: {h: '', s: '', v: ''},
    githubStarCount: '650'
  }),
  filters: {
    formatInt: function (value) {
      return Math.round(value);
    }
  },
  methods: {
    updateColor(color) {
      if (color.index === 0) {
        this.color = color.hsv;
        document.body.style.backgroundColor = color.hexString;
        if (this.colorObj) this.colorObj.set(this.color);
      }
    }
  },
  mounted() {
    // fetch star count from github
    axios.get(`https://api.github.com/repos/jaames/iro.js`)
      .then(res => {
        this.githubStarCount = res.data['stargazers_count'];
      })
      .catch(error => {
        throw new Error(error);
      });
      
    this.$onIroReady((iro) => {
      this.colorObj = new iro.Color(null, (color) => {
        this.hsv = color.hsv;
        this.rgbString = color.rgbString;
      });
      this.colorObj.set(this.color);
    });
    
    // remove no-scroll class from docpage navbar logic
    document.body.classList.remove('no-scroll');
  }
}
</script>

<style src="../styles/theme.scss" lang="scss"></style>
<style lang="scss">
@import '@styles/config.scss';

%wrapper {
  width: 100%;
  padding: 0 12px;
  margin: 0 auto;

  @media (min-width: $breakpoint-medium) {
    max-width: 860px;
  }

  @media (min-width: $breakpoint-large) {
    max-width: 960px;
  }
}

.Home {
  margin: $main-frame-padding-mobile;
  border-radius: $main-frame-radius;
  color: $text-invert;
  background: $background-invert;
  border-radius: 16px;
  box-shadow: 0 10px 15px -5px rgba(32,32,64,.25);
  z-index: 100;
  overflow: hidden;
  position: relative;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  @media (min-width: $breakpoint-medium) {
    margin: $main-frame-padding;
  }

  h2, h3 {
    background: linear-gradient(45deg, $text-invert, $text-invert-alt);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.GithubCorner {
  position: absolute;
  top: -10px;
  right: -10px;
  transition: transform 0.2s;
  display: block;
  width: 130px;
  height: 130px;

  .GithubCorner__svg {
    fill: transparent;
    stroke-width: 2px;
    stroke: $text-invert;
    width: 130px;
    height: 130px;
    transition: fill .2s, stroke-width .2s;
  }

  &:hover {
    transform: translate(-10px, 10px);
    
    .GithubCorner__svg {
      fill: $text-invert;
      // stroke: none;
      stroke-width: 0 !important;
    }
  }
}

.HomeLanguageSelect {
  position: absolute;
  top: 24px;
  left: 24px;
}

.Title {
  text-align: center;
  display: inline-block;
  margin: 0 auto;
}

.Hero {
  @extend %wrapper;
  display: flex;
  // max-width: $mobile-wrapper-width;
  margin: 0 auto;
  width: 100%;
  padding: 0 12px;
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

.Hero__demo {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}

.Hero__title {
  font-weight: 700;
  // font-size: 52px;
  margin-bottom: .4em;
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
  .Hero__body {
    align-items: center;
    flex-direction: row;
  }

  .Hero__demo {
    flex: 1;
    justify-content: flex-start;
    padding: 0;
  }

  .Hero__intro {
    flex: 1;
    text-align: left;
    margin-top: 3rem;
    
    .ButtonGroup {
      justify-content: flex-start;
    }
  }
}

.Section {
  @extend %wrapper;
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

.FormatDemo div[class*="language-"] {
  background: $background-invert-alt;
}

.FormatDemo__readout {
  overflow-x: scroll;
  white-space: pre;
  background: $background-invert-alt;
  color: $text-invert;
  padding: 24px;
  border-radius: 12px;

  code {
    white-space: pre !important;
    background: inherit !important;
  }

  @media (max-width: $breakpoint-small) {
    margin: 0 -12px;
    border-radius: 0;
  }
}

.MultiColorDemo {
  margin-left: -24px;
}

.FeatureGrid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 24px;
  text-align: left;

  p {
    color: mix($text-invert, $text-invert-alt, 50%);
  }
}

.RepoGrid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 24px;
}

.Button {
  color: $text-invert;
  height: 54px;
  border: 2px solid rgb(192, 196, 216);
  // background: rgb(89, 89, 99);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 28px;
  font-size: 1.2rem;
  transition: color .2s, border-color .2s, background-color .2s;
  cursor: pointer;

  &:hover {
    background-color: $text-invert;
    color: $text;
    border-color: $text-invert;
  }

  & .Button__starcount {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 2px solid rgb(192, 196, 216);
    transition: border-color .2s;
  }

  &:hover .Button__starcount {
    border-color: $text;
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

.GetStartedTutorial {
  position: relative;
}

.GetStartedTutorial__language {
  position: absolute;
  top: 20px;
  right: 20px;
}

.Footer {
  @media (max-width: $breakpoint-medium) {
    padding-bottom: 0;
  }

  @media (min-width: $breakpoint-medium) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }
}

.Author {
  color: $text;
  font-weight: 500;
  line-height: 1.5;
  background: linear-gradient(65deg, rgb(107, 128, 248) 0%,rgb(152, 145, 247) 50%, rgb(99, 193, 247) 75%, rgb(169, 250, 230) 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  // align-items: center;

  a {
    color: inherit;
    &:hover {
      color: $text-invert;
    }
  }
  
  @media (max-width: $breakpoint-medium) {
    margin: 0 -12px;
    border-radius: 0;
  }
}

.Author__imgOuter {
  padding: 2px;
  border: 2px solid $text; 
  width: 86px;
  height: 86px;
  border-radius: 50%;
  margin-right: 18px;
}

.Author__img {
  width: 78px;
  height: 78px;
  border-radius: 50%;
}

.Author__linkGroup {
  display: flex;
  list-style-type: none;
}

.Author__link {
  margin-top: .5rem;
  margin-right: 1rem;
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

.Sponsors__icon {
  display: block;
  width: 300px;
  height: auto;
}

.Sponsors__title {
  margin-bottom: 1rem;
}

.Sponsors__link {
  display: inline-block;
  margin-top: 1rem;
}

</style>
