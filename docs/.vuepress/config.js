const path = require('path');

module.exports = {
  title: 'iro.js',
  description: 'A lightweight, SVG-based color picker library for the modern web.',
  // base: '/iro.js/',
  ga: 'UA-52026208-5',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://iro.js.org/assets/favicon.png?v=4' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'iro.js' }],
    ['meta', { name: 'twitter:title', property: 'og:title', content: 'iro.js' }],
    ['meta', { name: 'twitter:description', property: 'og:description', content: 'An HSV color picker widget for JavaScript - with zero dependencies and a modern, SVG-based UI' }],
    ['meta', { name: 'twitter:image', property: 'og:image', content: 'https://iro.js.org/assets/social.png' }],
    ['meta', { name: 'twitter:image:width', property: 'og:image:width', content: '800' }],
    ['meta', { name: 'twitter:image:height', property: 'og:image:height', content: '400' }],
  ],
  themeConfig: {
    repo: 'jaames/iro.js',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    sidebar: [
      '/',
      '/introduction.html',
      '/guide.html',
      '/plugins.html',
      '/colorPicker_api.html',
      '/color_api.html',
      '/migrating.html',
      {
        title: 'Links',
        children: [
          ['https://github.com/jaames/iro.js', 'iro.js on GitHub'],
          ['https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XS9R3QTLZYAXQ&source=url', 'Donate'],
          ['https://github.com/jaames/iro.js/issues', 'Submit an Issue / Request'],
          // ['mailto:james@rakujira.jp', 'Email Support'],
          ['https://codepen.io/rakujira/pen/WZOeNq?editors=0010', 'Codepen Demo'],
          ['https://twitter.com/rakujira', 'Follow me on Twitter'],
        ]
      }
    ]
  },
  configureWebpack: (config, isServer) => {
    config.module.rules
      .filter(r => r.test.toString().includes("svg"))
      .forEach(r => {
        r.test = /\.(png|jpe?g|gif)$/;
      });
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'vue-svg-loader'
    });
  }
}