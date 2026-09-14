import Link from 'next/link'

type Crumb = {
  label: string
  href?: string
}

export default function PageBreadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="border-b border-black/[0.05] bg-white">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm text-brand-muted sm:px-6 lg:px-8">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="font-medium text-brand-green-800 transition-colors hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-body">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
