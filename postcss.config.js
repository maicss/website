import tailwindTypography from '@tailwindcss/typography'

export default {
  plugins: {
    "@tailwindcss/postcss": {
      content: ['./.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography],
      theme: {
        extend: {
          spacing: {
            '100': '25rem'
          }
        },
      },
    }
  }
}

