// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import BlogIndex from './BlogIndex.vue'
import GiscusLayout from './GiscusLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: GiscusLayout,
  enhanceApp({ app }) {
    app.component('BlogIndex', BlogIndex)
  }
}
