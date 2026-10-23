import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { siteName, siteDescription } from '@/lib/site'

import '../styles.css'

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="font-display text-5xl font-semibold mb-4">
        Page not found
      </h1>
      <p className="mb-6 text-ink-soft">That post or page does not exist.</p>
      <Link
        to="/"
        className="font-mono text-sm uppercase tracking-widest text-clay underline underline-offset-4 hover:text-ink"
      >
        Browse all posts
      </Link>
    </div>
  ),
  head: () => ({
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..600&family=IBM+Plex+Mono:wght@400;500&family=Literata:ital,opsz,wght@0,7..72,400..600;1,7..72,400&display=swap',
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <header className="border-b border-rule bg-paper/80 backdrop-blur">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
            <Link
              to="/"
              className="group flex items-center gap-3 font-display text-xl font-semibold tracking-tight"
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper font-display italic text-lg transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:bg-clay"
              >
                s
              </span>
              {siteName}
            </Link>
            <span className="hidden sm:block font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              Essays &amp; field notes
            </span>
          </div>
        </header>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-rule">
          <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row gap-2 justify-between font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            <span>
              © {new Date().getUTCFullYear()} {siteName}
            </span>
            <span>Written slowly, read slowly.</span>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}
