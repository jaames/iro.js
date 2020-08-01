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
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      // title: 'VuePress',
      // description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      // title: 'VuePress',
      // description: 'Vue 驱动的静态网站生成器'
    }
  },
  // theme: 'theme',
  themeConfig: {
    repo: 'jaames/iro.js',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    locales: {
      '/': {
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        // text for the edit-on-github link
        editLinkText: 'Edit this page on GitHub',
        sidebar: [
          '/introduction',
          '/guide',
          '/advanced',
          '/colorPicker_api',
          '/color_api',
          '/migrating',
        ]
        
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        sidebar: [
          '/zh/introduction',
          '/zh/guide',
          '/zh/advanced',
          '/zh/colorPicker_api',
          '/zh/color_api',
          '/zh/migrating',
        ]
      }
    },
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
          '/zh/': '提示'
        }
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