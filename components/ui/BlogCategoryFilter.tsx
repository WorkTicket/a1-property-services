'use client'

import { useState } from 'react'

export default function BlogCategoryFilter({ categories }: { categories: string[] }) {
  const [active, setActive] = useState('All')

  const select = (name: string) => {
    setActive(name)
    const list = document.getElementById('blog-index')
    if (!list) return
    list.querySelectorAll<HTMLElement>('.blog-article').forEach((article) => {
      const category = article.getAttribute('data-category')
      article.hidden = name !== 'All' && category !== name
    })
  }

  return (
    <div
      className="flex flex-wrap gap-x-1 gap-y-1 border-b border-black/10 pb-px"
      role="tablist"
      aria-label="Filter articles by category"
    >
      {categories.map((name) => {
        const isActive = active === name
        return (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(name)}
            className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
              isActive
                ? 'border-brand-gold text-brand-dark'
                : 'border-transparent text-brand-muted hover:text-brand-dark'
            }`}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}
