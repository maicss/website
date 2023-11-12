<script setup lang="ts">
import { useData } from 'vitepress'
import Article from './Article.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="antialiased dark:bg-slate-900">
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Article />
    </main>
  </div>
</template>