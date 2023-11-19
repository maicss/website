#!/usr/bin/env node
import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import { exit } from 'node:process'
import matter from 'gray-matter'

/**
 * 扫描blog文件夹下所有的blog文件，查看有没有vitepress的Frontmatter，保证有：
 * - date 没有的话赋值为时间
 * - image index 文章列表展示用
 * - prev 和 next，所有的文章按照时间排序，最早的prev是index，最晚的next是index，其他互相指
 * - description 文章标题
 */

const PAGE_CONFIG_SYMBOL = '---'
let breakBuildInfo = ''
const DIRNAME = dirname(fileURLToPath(import.meta.url))
const folder = resolve(DIRNAME, '../pages/blog/')

const buildFrontMatter = (data) => {
  if (!data.image) breakBuildInfo += `${data.file} doesn't have image`
  const lines = [PAGE_CONFIG_SYMBOL]
  lines.push(`date: ${data.date}`)
  lines.push(`description: ${data.description}`)
  lines.push(`image: ${data.image}`)
  lines.push(`prev:`)
  lines.push(`  text: ${data.prev.text}`)
  lines.push(`  link: ${data.prev.link}`)
  lines.push(`next:`)
  lines.push(`  text: ${data.next.text}`)
  lines.push(`  link: ${data.next.link}`)
  lines.push(PAGE_CONFIG_SYMBOL)
  return lines.join('\r\n')
}

readdir(folder)
  .then((files) => {
    const needHandleFiles = files.filter((file) => file.endsWith('.md') && file !== 'index.md')
    return Promise.all(
      needHandleFiles.map((file) => {
        const filePath = resolve(folder, file)
        return Promise.all([
          readFile(filePath),
          stat(filePath).then((statValue) => ({
            date: statValue.birthtime.toLocaleDateString('zh-CN'),
            ts: statValue.birthtimeMs,
          })),
        ]).then(([fileContent, attr]) => {
          const item = { file }
          const { data, content } = matter(fileContent)
          if (data.date) {
            item.date = typeof data.date === 'string' ? data.date : data.date.toLocaleDateString('zh-CN')
            item.ts = new Date(data.date).getTime()
          } else {
            item.date = attr.date
            item.ts = attr.ts
          }
          item.image = data.image || ''
          item.content = content
          const firstLine = content.trim().split('\r\n')[0].trim()
          item.description = firstLine.startsWith('#') ? firstLine.slice(1).trim() : ''
          return item
        })
      })
    )
  })
  .then((items) => {
    items.sort((a, b) => a.ts - b.ts)
    items.forEach((item, index) => {
      if (index === 0) {
        item.prev = { text: 'Blog 首页', link: '/blog/' }
        item.next = { text: items[index + 1].description, link: '/blog/' + items[index + 1].file.slice(0, '.md'.length * -1) }
      } else if (index === items.length - 1) {
        item.prev = { text: items[index - 1].description, link: '/blog/' + items[index - 1].file.slice(0, '.md'.length * -1) }
        item.next = { text: 'Blog 首页', link: '/blog/' }
      } else {
        item.prev = { text: items[index - 1].description, link: '/blog/' + items[index - 1].file.slice(0, '.md'.length * -1) }
        item.next = { text: items[index + 1].description, link: '/blog/' + items[index + 1].file.slice(0, '.md'.length * -1) }
      }
    })

    return Promise.all(
      items.map((item) => writeFile(resolve(folder, item.file), buildFrontMatter(item) + '\r\n' + item.content))
    ).then(() => {
      if (breakBuildInfo.length) {
        console.error(`WARNING: [${breakBuildInfo}] build failed, exiting.`)
        exit(1)
      }
    })
  })
  .catch(console.error)
