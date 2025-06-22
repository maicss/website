<!-- .vitepress/theme/Layout.vue -->

<script setup>
import { useData, useRoute, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { nextTick, onMounted, ref, watch, onUnmounted } from 'vue'
import Giscus from '@giscus/vue'
const { Layout } = DefaultTheme
const { page, frontmatter, isDark } = useData()
// import useFoldCode from './composables/useFoldCode'

// useFoldCode()
const route = useRoute()
const router = useRouter()

const NoCommentPages = ['/', '/pyqt/', '/blog/']
const mountComment = ref(false)

const foldCode = () => {
  if (frontmatter.value.codeFolder !== false) {
    const codeblocks = document.querySelectorAll(`.vp-doc div[class*='language-']`)

    if (codeblocks.length) {
      codeblocks.forEach((codeblock) => {
        if (parseFloat(getComputedStyle(codeblock).height) > 400) {
          codeblock.classList.add('h-100')
          codeblock.classList.add('transition-all')
          // codeblock.classList.add("ease-linear");
          const pres = codeblock.querySelectorAll('pre')
          pres.forEach((pre) => {
            pre.classList.add('h-100')
            pre.classList.add('transition-all')
            // pre.classList.add("ease-linear");
            pre.classList.add('mb-12')
            pre.classList.add('overflow-hidden')
          })
          const codeFoldMask = document.createElement('div')
          codeFoldMask.className = 'code-fold-mask'
          codeFoldMask.innerHTML =
            `<svg viewBox="0 0 1024 1024" width="24px" class="code-fold-button" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
            </svg>`
          codeFoldMask.addEventListener('click', () => {
            const svg = codeFoldMask.querySelector('svg')
            if (svg.classList.contains('reverse')) {
              svg.classList.remove('reverse')
              codeblock.classList.add('h-100')
              pres.forEach((pre) => {
                pre.classList.add('h-100')
                pre.classList.add('overflow-hidden')
              })
            } else {
              svg.classList.add('reverse')
              codeblock.classList.remove('h-100')
              pres.forEach((pre) => {
                pre.classList.remove('h-100')
                pre.classList.remove('overflow-hidden')
              })
            }
          })
          codeblock.insertAdjacentElement('beforeend', codeFoldMask)
        }
      })
    }
  }
}

const imageViewer = () => {
  const images = document.querySelectorAll('.vp-doc img')
  const mask = document.querySelector('.mask')
  images.forEach((img) => {
    img.onload = () => {
      if (img.naturalHeight > img.height || img.naturalWidth > img.width) {
        img.classList.add('cursor-zoom-in')
        img.addEventListener('click', () => {
          mask.classList.remove('invisible')
          mask.classList.add('visible')
          const maskImage = document.createElement('img')
          const minImagePx = Math.min(img.naturalHeight, img.naturalWidth)
          const minWindowPx = Math.min(window.innerHeight, window.innerWidth)
          if (minImagePx > minWindowPx) {
            maskImage.classList.add('w-4/5')
          } else {
            maskImage.width = Math.min(minWindowPx * 0.8, minImagePx)
          }
          maskImage.src = img.src
          mask.appendChild(maskImage)
        })
      }
    }
  })
}

const maskClickHide = () => {
  const mask = document.querySelector('.mask')
  mask?.addEventListener('click', () => {
    mask.classList.remove('visible')
    mask.classList.add('invisible')
    mask.innerHTML = ''
  })
}

onMounted(() => {
  handleCommentComponent()
  foldCode()
  imageViewer()
  maskClickHide()
})

const handleCommentComponent = () => {
  const showComment =
    !NoCommentPages.includes(route.path) && frontmatter.value?.comment !== false && page.value.isNotFound !== true
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
//
//   await document.startViewTransition(async () => {
//     isDark.value = !isDark.value
//     await nextTick()
//   }).ready
//
//   document.documentElement.animate(
//     { clipPath: isDark.value ? clipPath.reverse() : clipPath },
//     {
//       duration: 300,
//       easing: 'ease-in',
//       pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
//     }
//   )
// })

// router.onBeforeRouteChange = async (to) => {
//   if (document.startViewTransition) {
//     await document.startViewTransition()
//   }
// }

router.onAfterRouteChanged = () => {
  foldCode()
  handleCommentComponent()
}

</script>

<template>
  <Layout>
    <template #doc-bottom>
      <div class="giscus-container" v-if="mountComment">
        <Giscus
          id="giscus"
          repo="maicss/website"
          repoid="R_kgDOKnduBQ"
          category="Announcements"
          categoryid="DIC_kwDOKnduBc4Cas0c"
          mapping="pathname"
          term="Welcome to Maicss' site"
          strict="0"
          reactionsenabled="1"
          emitmetadata="0"
          inputposition="top"
          loading="lazy"
          :theme="isDark ? 'transparent_dark' : 'light'"
          lang="zh-CN"
        >
          <p>Loading comments...</p>
        </Giscus>
      </div>
    </template>
  </Layout>
  <!-- <div class="progress"></div> -->
  <Teleport to="body">
    <div class="mask invisible fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-all"></div>
  </Teleport>
</template>

<style>
@reference 'tailwindcss'
.giscus-container {
  position: relative;
  padding-top: 32px;
  z-index: 5;

  @media (min-width: 960px) {
    border-top: 1px solid var(--vp-c-divider);
    margin-top: 0;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
    margin: 0 auto 40px;
  }
}

.code-fold-button {
  transition: rotate 0.2s;
  animation: bounce infinite 1.2s;
  rotate: 0deg;
}

.code-fold-button.reverse {
  rotate: 180deg;
}

.code-fold-mask {
  @apply absolute z-10 inset-x-0 bottom-0 h-12 flex items-center justify-center cursor-pointer;
  background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgb(195, 195, 195) 100%);
}

.dark .code-fold-mask {
  background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(195, 195, 195, 0.2) 100%);
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

/* .progress {
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
} */

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
