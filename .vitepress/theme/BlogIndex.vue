<script setup lang="ts">
import { useData } from 'vitepress'
import { data } from './blog.data.js'
import {ref, computed} from 'vue'
const { frontmatter } = useData()

const PRE_PAGE = 10

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
  <div class="antialiased dark:bg-slate-900 blog-index">
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 pt-10">
      <ul>
        <li v-for="item in currentPagePosts" :key="item.url" class="mb-4 cursor-pointer border-b last-of-type:border-b-0 py-10">
          <a :href="item.url" class="flex gap-y-4 flex-col no-underline">
            <p>{{ item.date }}</p>
            <div v-html="item.excerpt" class="line-clamp-5 prose dark:prose-invert lg:prose-xl flex-[3_4]"></div>
            <div class="text-base leading-6 font-medium text-right">
              <a class="text-sky-500" aria-label="read more" :href="url">Read more →</a>
            </div>
          </a>
        </li>
    </ul>
    <div class="pagination my-8 select-none" v-if="pageTotal > 1">
      <ul class="flex gap-x-4 justify-center items-center">
        <li class="bordered rounded w-8 h-8 bg-slate-100 flex justify-center items-center cursor-pointer hover:text-sky-400" @click="changePage('prev')">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"></path></svg>
        </li>
        <li v-for="index in pageTotal" class="bordered rounded w-8 h-8 flex justify-center items-center cursor-pointer" :class="[pageCurrent === index ? ' bg-sky-300 text-white' : 'text-black hover:text-sky-300 bg-slate-100']" @click="changePage(index)">{{ index }}</li>
        <li class="bordered rounded w-8 h-8 bg-slate-100 flex justify-center items-center cursor-pointer hover:text-sky-400" @click="changePage('next')">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></svg>
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
