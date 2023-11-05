import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Maicss",
  description: "Miacss' website",
  // base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  //   [ 'link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' } ],
  //   ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=TAG_ID' }],
  //   ['script', {},
  //     `window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());
  //     gtag('config', 'TAG_ID');`],

  ],
  srcExclude: ['../README.md'],
  srcDir: './pages',
  lang: 'zh-CN',
  // cleanUrls: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
  },
  sitemap: {
    hostname: 'https://maicss.com'
  },
  lastUpdated: true,
})
