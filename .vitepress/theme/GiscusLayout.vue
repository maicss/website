<!-- .vitepress/theme/Layout.vue -->

<script setup lang="ts">
import { useData, useRoute, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, ref, watch, provide } from 'vue';
import BlogIndex from './BlogIndex.vue';
const { Layout } = DefaultTheme
const { page, frontmatter, isDark } = useData()

const route = useRoute()
const router = useRouter()

const NoCommentPages = ['/', '/pyqt/', '/blog/']
const mountComment = ref(false)

onMounted(() => {
  import('giscus')
  handleCommentComponent()
});

const handleCommentComponent = () => {
  const showComment = !NoCommentPages.includes(route.path) && frontmatter.value?.comment !== false && page.value.isNotFound !== true
  mountComment.value = showComment
}

// const enableTransitions = () =>
//   'startViewTransition' in document &&
//   window.matchMedia('(prefers-reduced-motion: no-preference)').matches
//
// provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
//   if (!enableTransitions()) {
//     isDark.value = !isDark.value
//     return
//   }
//
//   const clipPath = [
//     `circle(0px at ${x}px ${y}px)`,
//     `circle(${Math.hypot(
//       Math.max(x, innerWidth - x),
//       Math.max(y, innerHeight - y)
//     )}px at ${x}px ${y}px)`
//   ]

//   await document.startViewTransition(async () => {
//     isDark.value = !isDark.value
//     await nextTick()
//   }).ready

//   document.documentElement.animate(
//     { clipPath: isDark.value ? clipPath.reverse() : clipPath },
//     {
//       duration: 300,
//       easing: 'ease-in',
//       pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
//     }
//   )
// })

router.onBeforeRouteChange = async (to) => {
  if (document.startViewTransition) {
    await document.startViewTransition()
  }
}

watch(() => route.path, () => {
  nextTick().then(handleCommentComponent).then(() => {
    if (mountComment.value) {
      document.querySelector('#giscus')!.setAttribute('theme', isDark.value ? 'transparent_dark' : 'light')
    }
  })
})

watch([isDark], () => {
  if (mountComment.value) {
    document.querySelector('#giscus')!.setAttribute('theme', isDark.value ? 'transparent_dark' : 'light')
  }
})
</script>

<template>
  <Layout>
    <template #doc-bottom>
      <div class="giscus-container" v-if="mountComment">
        <giscus-widget v-pre id="giscus" repo="maicss/website" repoid="R_kgDOKnduBQ" category="Announcements"
          categoryid="DIC_kwDOKnduBc4Cas0c" mapping="pathname" term="Welcome to Maicss' site" strict="0"
          :reactionsenabled="true" emitmetadata="0" inputposition="top" theme="light" lang="zh-CN">
          <p>Loading comments...</p>
        </giscus-widget>
      </div>
    </template>
  </Layout>
  <div class="progress"></div>
</template>

<style>
.giscus-container {
  @media (min-width: 1200px) {
    width: 786px;
    margin-bottom: 40px;
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 20px;
  }
}

/* ::view-transition-old(root),
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
} */

/** page transition */
/* #app {
  view-transition-name: app;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform-origin: bottom center;
    transform: rotate(-5deg);
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
    transform-origin: bottom center;
    transform: rotate(5deg);
  }
}
 */
/* ::view-transition-old(app) { */
  /* animation-name: fade-out; */
  /* Ease-out Back. Overshoots. */
  /* animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
} */

/* ::view-transition-new(app) { */
  /* animation-name: fade-in; */
  /* Ease-out Back. Overshoots. */
  /* animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
} */

.progress {
  height: 2px;
  background: #6ea11e;
  position: fixed;
  bottom: 0;
  z-index: 70;
  left: 0;
  width: 100%;
  transform-origin: 0 50%;
  animation: scaleProgress auto linear;
  animation-timeline: scroll(root);
}

@keyframes scaleProgress {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
}

/* @keyframes colorChange {
  0% {
    background-color: rgb(145, 203, 92);
  }
  50% {
    background-color: yellow;
  }
  100% {
    background-color: red;
  }
} */
</style>