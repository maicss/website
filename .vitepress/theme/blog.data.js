import { createContentLoader } from 'vitepress'
export default createContentLoader('./blog/*.md', {
  excerpt: true,
  
  transform(raw) {
    console.log('raw', raw)
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        image: frontmatter.image || '',
        excerpt,
        isHome: url === '/blog/',
        // date: formatDate(frontmatter.date)
        date: frontmatter.date
      }))
      .filter(blog => !blog.isHome)
      .sort((a, b) => b.date - a.date)
  }
})

const data = []


function formatDate(raw) {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

export { data }
