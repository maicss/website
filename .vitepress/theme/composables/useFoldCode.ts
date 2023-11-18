import { onMounted } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
const { page, frontmatter, isDark } = useData()


export default () => {
    onMounted(() => {
        if (frontmatter.value.codeFolder !== false) {
    
            const codeblocks = document.querySelectorAll(`.vp-doc div[class*='language-']`)
    
            if (codeblocks.length) {
                codeblocks.forEach(codeblock => {
                    if (Number(getComputedStyle(codeblock).height) > 400) {
                    }
                })
            }
        }
    
    })
}
