<script setup lang="ts">
// import type { data as Post } from './blog.data'

const props = defineProps<{ date: {
    time: number
    string: string
} }>()

function getDateTime() {
  return new Date(props.date.time).toISOString()
}
</script>

<template>
  <dl>
    <dt class="sr-only">Published on</dt>
    <dd class="text-base leading-6 font-medium text-gray-500 dark:text-gray-300">
      <time :datetime="getDateTime()">{{ date.string }}</time>
    </dd>
  </dl>
</template>