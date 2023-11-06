<!-- .vitepress/theme/Layout.vue -->

<script setup lang="ts">
import { useData, useRoute, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, ref, watch, provide } from 'vue';
const { Layout } = DefaultTheme
const { frontmatter, isDark } = useData()

const route = useRoute()
const router = useRouter()

const NoCommentPages = ['/', '/pyqt/', '/blog/']
const mountComment = ref(false)

// const 
onMounted(() => {
  import('giscus');
  handleCommentComponent()
});

const handleCommentComponent = () => {
  mountComment.value = !NoCommentPages.includes(route.path) || frontmatter.value?.comment
}

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})


router.onAfterRouteChanged = () => {

}
// onAfterRouteChanged((to) => {
//   console.log(1111, to)
// })


// onBeforeRouteChange((to) => {
//   console.log(2222, to)
//   return true
// })

watch(() => route.path, () => {
  nextTick().then(() => {
    handleCommentComponent()
  })
})

watch([isDark], () => {
  // console.log(1111, isDark, document.querySelector('#giscus'), document.querySelector('#giscus').getAttribute('theme'))
  document.querySelector('#giscus').setAttribute('theme', isDark.value ? 'dark' : 'light')
  nextTick().then(() => {
  })
})

// todo 1, 上面俩监听是不是可以去掉一个
// todo 2, 为啥官方的vue包装不用 v-pre
// todo 3, 为啥官方的vue包装可以直接使用v-if
// todo 4, 换肤，不使用重新渲染的方式试试看
</script>

<template>
  <Layout>
    <template #doc-bottom>
      <div v-if="mountComment">
        <giscus-widget
          v-pre
          id="giscus"
          repo="maicss/website"
          repoid="R_kgDOKnduBQ"
          category="Announcements"
          categoryid="DIC_kwDOKnduBc4Cas0c"
          mapping="pathname"
          term="Welcome to Maicss' site"
          strict="0"
          :reactionsenabled="true"
          emitmetadata="0"
          inputposition="top"
          theme="light"
          lang="zh-CN"
        >
        <p>Loading comments...</p>
      </giscus-widget>
      </div>
    </template>
  </Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>