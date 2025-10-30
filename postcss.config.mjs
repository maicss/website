import tailwindTypography from '@tailwindcss/typography'

export default {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        './**/*.md', // 扫描所有 Markdown 文件
        './.vitepress/theme/**/*.{vue,js,ts}', // 扫描自定义主题组件
      ],
      plugins: [tailwindTypography],
      theme: {
        extend: {
          spacing: {
            100: '25rem', // todo 这个没生效
          },
        },
      },
    },
  },
}
