import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Maicss",
  description: "Miacss' website",
  // base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    // [ 'link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' } ],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-7KBNJR8LJ3' }],
    ['script', {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7KBNJR8LJ3');`
    ],
    [ 'script', {}, 
    `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?cf025a6c77712bb71c5407558d3bd6b7";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`
    ],

  ],
  srcExclude: ['../README.md'],
  srcDir: './pages',
  lang: 'zh-CN',
  // cleanUrls: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config、
    outline: {
      label: 'TOC'
    },
    returnToTopLabel: 'returnToTopLabel',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    editLink: {
      pattern: 'https://github.com/maicss/weisite/edit/main/docs/:path',
      text: '在GitHub上编辑此页面'
    },
    siteTitle: "Miacss' website",
    nav: [
      { text: '首页', link: '/' },
      { text: 'PyQT 教程', link: '/pyqt/' },
      { text: 'Blog', link: '/blog/' },
    ],
    logo: {src: '/logo.png', alt: 'maicss\' website logo'},
    i18nRouting: false,
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/maicss' }
    ],
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Maicss'
    },
    // search: {
    //   provider: 'local'
    // },

    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    lastUpdated: {
      text: '更新时间: '
    },
  },
  sitemap: {
    hostname: 'https://maicss.com'
  },
})
