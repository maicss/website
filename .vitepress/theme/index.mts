import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
// import './custom.css'
import GiscusLayout from './giscusLayout.vue'

export default {
    extends: DefaultTheme,
    Layout: GiscusLayout,
    enhanceApp({app}) {
        // app.component()
    }
} satisfies Theme