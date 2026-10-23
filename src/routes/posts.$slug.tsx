import { createFileRoute, Link } from '@tanstack/react-router'
import { findPost, formatDate, readingTime } from '@/lib/blog'
import { siteName } from '@/lib/site'
import { CategoryLinks } from '@/components/category-links'

import { allPosts } from 'content-collections'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    return findPost(allPosts, params.slug)
  },
  head: ({ loaderData: post }) => ({
    meta: post
      ? [
          { title: `${post.title} | ${siteName}` },
          { name: 'description', content: post.summary },
          { name: 'author', content: post.author },
          { property: 'og:title', content: post.title },
          { property: 'og:description', content: post.summary },
          { property: 'og:type', content: 'article' },
          {
            property: 'article:published_time',
            content: `${post.date}T00:00:00Z`,
          },
          ...post.categories.map((category) => ({
            property: 'article:tag',
            content: category,
          })),
        ]
      : [],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const post = Route.useLoaderData()

  return (
    <article className="max-w-3xl mx-auto px-6 pt-12 pb-24">
      <Link
        to="/"
        className="group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-clay"
      >
        <span className="transition-transform group-hover:-translate-x-1">
          ←
        </span>
        All posts
      </Link>
      <div className="mb-5">
        <CategoryLinks categories={post.categories} />
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight mb-6">
        {post.title}
      </h1>
      <p className="font-display text-xl italic leading-relaxed text-ink-soft mb-8">
        {post.summary}
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-y border-rule py-4 mb-10 text-sm">
        <span>
          By <strong className="font-semibold">{post.author}</strong>
        </span>
        <time dateTime={post.date} className="text-ink-soft">
          {formatDate(post.date)}
        </time>
        <span className="text-ink-soft">
          {readingTime(post.content)} min read
        </span>
      </div>
      {post.image && (
        <img
          src={post.image}
          alt={post.imageAlt ?? post.title}
          width={800}
          height={450}
          className="mb-10 aspect-video w-full rounded-2xl object-cover"
        />
      )}
      <div
        className="prose prose-lg max-w-none break-words text-ink prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink prose-a:text-clay prose-strong:text-ink prose-blockquote:border-clay prose-blockquote:font-display prose-blockquote:text-ink-soft prose-li:marker:text-clay prose-pre:overflow-x-auto prose-img:rounded-lg first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-clay"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
