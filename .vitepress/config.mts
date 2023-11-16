import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Maicss",
  description: "Miacss' website pyqt 中文 教程 pyqt5 pyqt6",
  // base: '/',
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    // [ 'link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' } ],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-7KBNJR8LJ3",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7KBNJR8LJ3');`,
    ],
    [
      "script",
      {},
      `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?cf025a6c77712bb71c5407558d3bd6b7";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`,
    ],
  ],
  srcDir: "./pages",
  lang: "zh-CN",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config、
    outline: {
      label: "TOC",
    },
    returnToTopLabel: "返回顶部",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    editLink: {
      pattern: "https://github.com/maicss/weisite/edit/main/docs/:path",
      text: "在GitHub上编辑此页面",
    },
    siteTitle: "Miacss' website",
    nav: [
      { text: "首页", link: "/" },
      { text: "PyQT 教程", link: "/pyqt/" },
      { text: "Blog", link: "/blog/" },
    ],
    logo: { src: "/logo.png", alt: "maicss' website logo" },
    i18nRouting: false,
    sidebar: {
      "/pyqt/": [
        {
          text: "PyQt 教程", link: '/pyqt/',
          items: [
            {
              text: "PyQt6",
              items: [
                { text: "介绍", link: "/pyqt/v6/" },
                { text: "日期和时间", link: "/pyqt/v6/datetime" },
                { text: "第一个程序", link: "/pyqt/v6/firstProgram" },
                { text: "菜单和工具栏", link: "/pyqt/v6/menusAndToolbars" },
                { text: "布局管理", link: "/pyqt/v6/layout" },
                { text: "事件和信号", link: "/pyqt/v6/eventsAndSignals" },
                { text: "对话框", link: "/pyqt/v6/dialogs" },
                { text: "组件（一）", link: "/pyqt/v6/widgets1" },
                { text: "组件（二）", link: "/pyqt/v6/widgets2" },
                { text: "拖放", link: "/pyqt/v6/DND" },
                { text: "绘画", link: "/pyqt/v6/painting" },
                { text: "自定义组件", link: "/pyqt/v6/customWidgets" },
                { text: "俄罗斯方块游戏", link: "/pyqt/v6/tetris" },
              ],
            },
            {
              text: "PyQt5",
              items: [
                { text: "介绍", link: "/pyqt/v5/" },
                { text: "日期和时间", link: "/pyqt/v5/datetime" },
                { text: "第一个程序", link: "/pyqt/v5/firstProgram" },
                { text: "菜单和工具栏", link: "/pyqt/v5/menusAndToolbars" },
                { text: "布局管理", link: "/pyqt/v5/layout" },
                { text: "事件和信号", link: "/pyqt/v5/eventsAndSignals" },
                { text: "对话框", link: "/pyqt/v5/dialogs" },
                { text: "组件（一）", link: "/pyqt/v5/widgets1" },
                { text: "组件（二）", link: "/pyqt/v5/widgets2" },
                { text: "拖放", link: "/pyqt/v5/DND" },
                { text: "绘画", link: "/pyqt/v5/painting" },
                { text: "自定义组件", link: "/pyqt/v5/customWidgets" },
                { text: "俄罗斯方块游戏", link: "/pyqt/v5/tetris" },
              ],
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/maicss" }],
    footer: {
      // message: 'Released under the MIT License.',
      copyright: "Copyright © 2019-present Maicss",
    },
    // search: {
    //   provider: 'local'
    // },

    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    lastUpdated: {
      text: "更新时间",
    },
  },
  sitemap: {
    hostname: "https://maicss.com",
  },
  // buildEnd: genFeed
});
