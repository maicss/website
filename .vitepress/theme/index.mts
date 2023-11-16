import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import GiscusLayout from './GiscusLayout.vue'
import BlogIndex from './BlogIndex.vue'

export default {
    extends: DefaultTheme,
    Layout: GiscusLayout,
    enhanceApp({app}) {
        app.component('BlogIndex', BlogIndex)
    }
} satisfies Theme