<template>
  <div class="home">
    <div class="hero">
      <div class="hero__frame hero__frame--left"></div>
      <div class="hero__frame hero__frame--right"></div>
      <div class="hero__frame hero__frame--top"></div>
      <div class="hero__frame hero__frame--bottom"></div>
      <div class="hero__content">
        <a class="githubCorner" href="//github.com/jaames/iro.js" target="_blank">
          <svg class="githubCorner__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
            <path d="M0 0l115 115h15l12 27 108 108V0z" fill="#fff"/>
            <path class="octo-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" style="-webkit-transform-origin: 130px 106px; transform-origin: 130px 106px"/>
            <path class="octo-body" d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"/>
          </svg>
        </a>
        <div class="hero__body">
          <div class="hero__half intro">
            <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 291 135">
              <g fill-rule="evenodd" transform="translate(3 3)">
                <path d="M10.8658744,21.787234 C4.86481766,21.787234 -3.55271368e-15,16.9099956 -3.55271368e-15,10.893617 C-3.55271368e-15,4.87723847 4.86481766,0 10.8658744,0 C16.8669311,0 21.7317487,4.87723847 21.7317487,10.893617 C21.7317487,16.9099956 16.8669311,21.787234 10.8658744,21.787234 Z M1.3582343,98.3175769 L1.3582343,33.0866784 C1.3582343,31.047696 2.99970941,29.412766 5.02457157,29.412766 L16.7071772,29.412766 C18.7358246,29.412766 20.3735144,31.0576326 20.3735144,33.0866784 L20.3735144,98.3175769 C20.3735144,100.356559 18.7320393,101.991489 16.7071772,101.991489 L5.02457157,101.991489 C2.99592415,101.991489 1.3582343,100.346623 1.3582343,98.3175769 Z"></path>
                <path d="M31.7470289 98.3610072C31.7470289 100.391332 33.3847187 102.037235 35.4133661 102.037235L47.0959717 102.037235C49.1208339 102.037235 50.762309 100.395931 50.762309 98.3799843L50.762309 64.9531915C50.762309 58.9484224 52.9748207 54.8762799 56.5944664 51.3977858 59.5480861 48.5593452 63.378574 47.8555592 68.2714726 48.6068673 69.6225407 48.8143248 69.0044805 48.7378332 69.0044805 48.7378332 70.9745461 49.1851498 73.0027591 47.9638231 73.5368468 46.0017467L76.612559 34.7025111C77.1456501 32.7440957 75.9818107 30.7664424 74.0056388 30.3025773 74.0056388 30.3025773 73.6585713 30.1795829 72.265932 29.9374131 63.9516616 28.4916217 57.3185258 29.9191981 50.762309 33.3991876L50.762309 33.0863798C50.762309 31.0574989 49.1246191 29.412766 47.0959717 29.412766L35.4133661 29.412766C33.388504 29.412766 31.7470289 31.0487265 31.7470289 33.0889941L31.7470289 98.3610072zM79.6943973 65.7702128C79.6943973 86.0576208 95.7141432 102.12766 115.951819 102.12766 136.190682 102.12766 152.224109 86.0564272 152.224109 65.7702128 152.224109 45.4078763 136.380527 29.412766 115.959253 29.412766 95.5379787 29.412766 79.6943973 45.4078763 79.6943973 65.7702128zM132.665535 65.7702128C132.665535 75.2257069 125.38925 82.5191489 115.951833 82.5191489 106.519002 82.5191489 99.2529711 75.2303066 99.2529711 65.7702128 99.2529711 56.2075221 106.371138 49.0212766 115.959253 49.0212766 125.547368 49.0212766 132.665535 56.2075221 132.665535 65.7702128z"></path>
                <ellipse cx="168.869" cy="91.234" rx="10.866" ry="10.894"></ellipse>
                <path d="M205.482173,21.787234 C199.481116,21.787234 194.616299,16.9099956 194.616299,10.893617 C194.616299,4.87723847 199.481116,7.10542736e-15 205.482173,7.10542736e-15 C211.48323,7.10542736e-15 216.348048,4.87723847 216.348048,10.893617 C216.348048,16.9099956 211.48323,21.787234 205.482173,21.787234 Z M195.974533,96.6808511 L195.974533,33.8971391 C195.974533,31.8724069 197.616008,30.2297872 199.64087,30.2297872 L211.323476,30.2297872 C213.352123,30.2297872 214.989813,31.8717166 214.989813,33.8971391 L214.989813,96.6808511 C214.989813,97.0707558 214.971702,97.615468 214.923207,98.2961421 C214.849657,99.3284659 214.720216,100.453151 214.520893,101.652144 C213.950545,105.082969 212.919143,108.529754 211.269596,111.83727 C206.981812,120.434734 199.418059,126.259738 188.871848,127.66905 C187.236091,127.887639 187.407617,127.811039 187.407617,127.811039 C185.388997,127.931948 183.750424,126.354334 183.750424,124.324302 L183.750424,112.611868 C183.750424,110.578041 185.20987,108.93617 187.010187,108.93617 C189.590832,108.93617 192.875669,106.091032 194.261813,103.311666 C194.989176,101.853225 195.485788,100.193626 195.764336,98.5180692 C195.862127,97.9298274 195.923688,97.3949383 195.974533,96.6808511 Z"></path>
                <path d="M281.636779,41.3166496 C279.943495,39.6226164 278.482831,38.5018526 276.155255,36.9591915 C269.591143,32.6086572 261.669822,30 252.52494,30 C240.194393,30 229.100342,38.5082476 227.001045,49.7025839 C225.802656,56.0928966 227.758982,62.4827949 232.593447,67.3445739 C237.119929,71.8966304 243.825407,74.8303029 252.407229,76.1823181 C257.298601,76.9529249 259.995228,77.2510638 260.945992,78.8851064 C261.896756,80.5191489 261.189874,81.952582 260.066128,82.8182435 C258.70825,83.8642656 256.992344,84.4680851 255.241408,84.4680851 C250.168608,84.4680851 245.880658,83.0141778 242.260253,80.5743315 C242.019039,80.4117733 241.784716,80.2473112 241.557389,80.0814942 C241.212904,79.8302198 241.112041,79.7030369 241.112041,79.7030369 C239.612211,78.3411841 237.087431,78.2247968 235.466029,79.4481771 L226.128675,86.4933982 C224.510299,87.7144959 224.278802,89.9405719 225.638299,91.4367163 C225.638299,91.4367163 225.05675,90.8693544 226.153762,91.9714346 C227.859707,93.6852619 229.32654,94.8286468 231.652105,96.3958812 C238.260903,100.849652 246.171594,103.531915 255.241408,103.531915 C267.451157,103.531915 278.504718,95.0169592 280.654069,83.8785649 C281.886647,77.4910845 279.973107,71.0908476 275.160667,66.2135555 C270.650906,61.643021 263.950446,58.7031093 255.35912,57.3495968 C250.456166,56.5771656 247.499473,56.2808511 246.548709,54.6468085 C245.597945,53.012766 246.457522,51.5788592 247.569427,50.7261173 C248.939366,49.6754836 250.695547,49.0638298 252.52494,49.0638298 C257.760363,49.0638298 262.088618,50.4892152 265.668819,52.8620851 C265.982391,53.0699131 266.283264,53.2807195 266.571275,53.4932587 C267.406506,54.1096235 266.663432,53.5629488 266.663432,53.5629488 C268.160857,54.9236084 270.685243,55.0412899 272.308571,53.8207109 L281.657015,46.7916221 C283.277313,45.5733206 283.510522,43.346229 282.151711,41.8495742 C282.151711,41.8495742 282.732365,42.4127202 281.636779,41.3166496 Z"></path>
              </g>
            </svg>
            <h3 class="intro__sub">A lightweight, SVG-based color picker library.</h3>
            <div class="intro__buttons">
              <a href="//codepen.io/rakujira/pen/WZOeNq?editors=0010" target="_blank" class="button">Codepen Demo</a>
              <router-link class="button" to="/introduction.html">Get Started →</router-link>
            </div>
          </div>
          <div class="hero__half demo" ref="demoContainer"></div>
        </div>
        <div class="hero__foot">Designed & Built by <a href="//rakujira.jp">James Daniel</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data () {
      return this.$page.frontmatter
    }
  },
  mounted() {
    // https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
    import("./js/iro.es.js").then(module => {
      const iro = module.default;
      this.wheel = new iro.ColorPicker(this.$refs.demoContainer, {
        sliderMargin: 24,
        markerRadius: 8,
        borderWidth: 2,
        borderColor: "#fff",
        width: 320,
        height: 320,
        anticlockwise: true,
        color: "#906bff",
        css: {
          ":root": {
            "--bgcolor": "$color",
          }
        }
      });
    });
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

  @include breakpoint(large) {
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

@include breakpoint(medium) {
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
  background: $background;
  color: $text-invert;
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
  @include breakpoint(medium) {
    flex-direction: row-reverse;
  }
  @include breakpoint(large) {
    padding: 6rem;
  }
}

.hero__head, .hero__foot {
  flex: 0;
  padding: 16px 24px;
}

.hero__foot {
  font-size: .9rem;
  color: rgba(255, 255, 255, 0.75);
  text-align: right;
}

.hero__half {
  padding: 2rem;
  @include breakpoint(medium) {
    flex: 1;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
  }
  @include breakpoint(large) {
    padding: 0;
  }
}

.intro {
  justify-content: center;
  align-items: flex-start;
  margin-top: 60px;
  max-width: 320px;
  @include breakpoint(medium) {
    max-width: none;
  }
  @include breakpoint(large) {
    margin-top: 90px;
  }
}

.intro__buttons {
  padding-top: 1rem;
  margin: 0 -.5rem;
  display: flex;
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
    fill: $background;
  }

  .githubCorner:hover & {
    transform: translate(-5px, 5px);
  }
}

.logo {
  height: 120px;
  // push alignment to left
  margin-right: auto;
  & path, & ellipse {
    fill: none;
    stroke: $text-invert;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
}

.button {
  margin: 0 .5rem;
  background: $text-invert;
  color: $text;
  border-radius: 5px;
  padding: .75rem 1rem;
  text-decoration: none;
  // transition: transform 0.2s ease;

  &:hover {
    // transform: scale(1.05);
  }

  &:visited {

  }
}
</style>
