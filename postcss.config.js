import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default {
  plugins: [
    tailwind({
      content: ['./.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography],
      theme: {
        extend: {
          spacing: {
            '100': '25rem'
          }
        },
      },
    })
  ]
}