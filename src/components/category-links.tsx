import { Link } from '@tanstack/react-router'

export function CategoryLinks({
  categories,
  selected,
}: {
  categories: string[]
  selected?: string
}) {
  if (!categories.length) return null
  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category}
          to="/category/$category"
          params={{ category }}
          aria-current={selected === category ? 'page' : undefined}
          className="rounded-full border border-ink/20 px-4 py-1.5 text-sm transition-colors hover:border-clay hover:bg-clay hover:text-card aria-[current=page]:border-clay aria-[current=page]:bg-clay aria-[current=page]:text-card"
        >
          {category}
        </Link>
      ))}
    </nav>
  )
}
