<script setup lang="ts">
import { useData } from 'vitepress'
import { data } from './blog.data'
import {ref, computed} from 'vue'
import ArrowLeft from './assets/arrow-left.svg'
import ArrowRight from './assets/arrow-right.svg'
const { frontmatter } = useData()

const PRE_PAGE = 15

const pageTotal = Math.ceil(data.length/PRE_PAGE)

const pageCurrent = ref(1)

const currentPagePosts = computed(() => data.slice((pageCurrent.value - 1) * PRE_PAGE, pageCurrent.value * PRE_PAGE))
const changePage = (page:number|'prev'|'next') => {
  if (page === 'prev') {
    if (pageCurrent.value !== 1) {
      pageCurrent.value = pageCurrent.value - 1
    }
  } else if (page === 'next') {
    if (pageCurrent.value !== pageTotal) {
      pageCurrent.value = pageCurrent.value + 1
    }
  } else {
    pageCurrent.value = page
  }
}
</script>

<template>
  <div class="antialiased dark:bg-slate-900">
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 pt-10">
      <ul>
        <li v-for="item in currentPagePosts" :key="item.url" class="mb-4 hover:scale-105 cursor-pointer overflow-hidden duration-150">
          <a :href="item.url" class="flex gap-x-4 h-44 rounded-lg border overflow-hidden blog-index-list-item line-clamp-6 no-underline">
            <img :src="'./images/' + item.image" alt="" class="flex-[1_4] object-center object-cover">
            <div v-html="item.excerpt" class="prose dark:prose-invert flex-[3_4] py-2 pr-2 h-full overflow-hidden"></div>
          </a>
        </li>
    </ul>
    <div class="pagination my-8 select-none" v-if="pageTotal > 1">
      <ul class="flex gap-x-4 justify-center items-center">
        <li class="bordered rounded w-8 h-8 bg-slate-100 flex justify-center items-center cursor-pointer hover:text-sky-400" @click="changePage('prev')">
          <ArrowLeft width="20px"/>
        </li>
        <li v-for="index in pageTotal" class="bordered rounded w-8 h-8 flex justify-center items-center cursor-pointer" :class="[pageCurrent === index ? ' bg-sky-300 text-white' : 'text-black hover:text-sky-300 bg-slate-100']" @click="changePage(index)">{{ index }}</li>
        <li class="bordered rounded w-8 h-8 bg-slate-100 flex justify-center items-center cursor-pointer hover:text-sky-400" @click="changePage('next')">
          <ArrowRight width="20px"/>
        </li>
      </ul>
    </div>
    </main>
  </div>
</template>

<style>
.blog-index-list-item.no-underline {
  text-decoration: none;
}

.vp-doc .header-anchor:before {
  content: ''
}

</style>