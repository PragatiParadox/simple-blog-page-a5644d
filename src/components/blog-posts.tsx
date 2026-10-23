import { Link } from '@tanstack/react-router'

import { type Post } from 'content-collections'
import { formatDate, newestPosts, readingTime } from '@/lib/blog'
import { siteDescription } from '@/lib/site'
import { CategoryLinks } from './category-links'

const accents = ['var(--color-clay)', 'var(--color-moss)', 'var(--color-dusk)']

export default function BlogPosts({
  title,
  posts,
  categories,
  selectedCategory,
}: {
  title: string
  posts: Post[]
  categories: string[]
  selectedCategory?: string
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-14 pb-20">
      <section className="mb-12 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">
          {selectedCategory ? 'Filed under' : 'A journal of small things'}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
          {selectedCategory ? (
            title
          ) : (
            <>
              Notes for living a little{' '}
              <em className="font-normal text-clay">more slowly.</em>
            </>
          )}
        </h1>
        {!selectedCategory && (
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            {siteDescription}
          </p>
        )}
      </section>

      <div className="flex flex-wrap items-center gap-3 border-y border-rule py-4 mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mr-2">
          Browse
        </span>
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="rounded-full border border-ink/20 px-4 py-1.5 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper aria-[current=page]:bg-ink aria-[current=page]:text-paper"
        >
          All posts
        </Link>
        <CategoryLinks categories={categories} selected={selectedCategory} />
      </div>

      {!posts.length && (
        <div className="mt-8">
          <p>
            {selectedCategory
              ? `No posts in ${selectedCategory} yet.`
              : 'No posts published yet. Check back soon.'}
          </p>
          {selectedCategory && (
            <Link to="/" className="mt-4 inline-block underline">
              Browse all posts
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {newestPosts(posts).map((post, index) => (
          <article
            key={post.slug}
            className="post-card relative flex flex-col rounded-2xl border border-rule bg-card p-7"
            style={
              {
                '--accent': accents[index % accents.length],
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              <span style={{ color: 'var(--accent)' }}>
                {post.categories[0] ?? 'Essay'}
              </span>
              <span>{readingTime(post.content)} min read</span>
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight">
              <Link
                to="/posts/$slug"
                params={{ slug: post.slug }}
                className="title-link after:absolute after:inset-0 after:content-['']"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-4 flex-1 leading-relaxed text-ink-soft">
              {post.summary}
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-dashed border-rule pt-5">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-semibold text-card"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {initials(post.author)}
              </span>
              <div className="text-sm leading-tight">
                <p className="font-semibold">{post.author}</p>
                <time dateTime={post.date} className="text-ink-soft">
                  {formatDate(post.date)}
                </time>
              </div>
              <span
                aria-hidden="true"
                className="read-more ml-auto font-mono text-xs uppercase tracking-widest"
                style={{ color: 'var(--accent)' }}
              >
                Read <span>→</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
