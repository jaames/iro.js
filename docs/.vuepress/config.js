const path = require('path');
const webpack = require('webpack');

module.exports = {
  title: 'iro.js',
  description: 'An HSV color picker widget for JavaScript, with a modern SVG-based user interface',
  // base: '/iro.js/',
  ga: 'UA-52026208-5',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://iro.js.org/assets/favicon.png?v=4' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://iro.js.org' }],
    ['meta', { property: 'og:site_name', content: 'iro.js' }],
    ['meta', { name: 'twitter:title', property: 'og:title', content: 'iro.js' }],
    ['meta', { name: 'twitter:description', property: 'og:description', content: 'An HSV color picker widget for JavaScript, with a modern SVG-based user interface' }],
    ['meta', { name: 'twitter:image', property: 'og:image', content: 'https://iro.js.org/assets/social.png' }],
    ['meta', { name: 'twitter:image:width', property: 'og:image:width', content: '800' }],
    ['meta', { name: 'twitter:image:height', property: 'og:image:height', content: '400' }],
  ],
  // theme: 'theme',
  themeConfig: {
    repo: 'jaames/iro.js',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    sidebar: [
      '/introduction.html',
      '/guide.html',
      '/advanced.html',
      '/colorPicker_api.html',
      '/color_api.html',
      '/migrating.html',
    ],
    sidebarLinks: [
      ['https://github.com/jaames/iro.js', 'iro.js on GitHub'],
      ['https://codepen.io/rakujira/pen/WZOeNq?editors=0010', 'Codepen Demo'],
      ['https://github.com/jaames/iro.js/issues', 'Open an Issue / Feature Request'],
      ['https://github.com/sponsors/jaames', 'Become a Sponsor'],
      ['https://twitter.com/rakujira', 'Follow me on Twitter'],
    ]
  },
  plugins: [
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
        },
      },
    ],
    [
      '@vuepress/plugin-google-analytics', 
      {
        'ga': 'UA-52026208-5'
      }
    ]
  ],
  configureWebpack: {
    // devtool: 'source-map',
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './theme/components'),
        '@styles': path.resolve(__dirname, './theme/styles'),
        '@js': path.resolve(__dirname, './theme/js'),
        '@icon': path.resolve(__dirname, './theme/icon'),
      }
    },

  },
  chainWebpack: config => {
		config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
				.loader("vue-svg-inline-loader")
        .options({ /* ... */ });
	}
  // configureWebpack: (config, isServer) => {
  //   config.module.rules
  //     .filter(r => r.test.toString().includes("svg"))
  //     .forEach(r => {
  //       r.test = /\.(png|jpe?g|gif)$/;
  //     });
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     loader: 'vue-svg-loader'
  //   });
  // }
}