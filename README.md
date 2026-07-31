# LG Subscribe Thailand — Next.js Frontend

Frontend-only web app for LG Subscribe (appliance rental), built with
**Next.js (App Router) + TypeScript**. No backend — every CTA leads the
customer to LINE (or phone) where a sales rep closes the deal.

The site is exported as **static files** (`output: 'export'`), so it deploys to
any static host exactly like the original hand-written HTML version.

## Structure

```
src/app/layout.tsx            Shared chrome: header, footer, floating LINE button,
                              Noto Sans Thai font, default metadata
src/app/page.tsx              Landing page (hero, trust badges, USPs, featured,
                              categories, steps, why-us, reviews, payments,
                              promo countdown, CTA)
src/app/products/             Catalog — category chips + budget filter + sort +
                              search (client-side, in CatalogBrowser.tsx)
src/app/products/[slug]/      Product detail — statically generated for every
                              product (gallery + plan picker are client components)
src/app/calculator/           Closing tool — Subscribe vs buy-outright comparison
                              (?slug=<product-slug> preselects a product)
src/app/careship/             After-sales page — free services, per-category care
                              schedule, 5-year timeline, Visit vs Self service
src/app/faq/                  Objection handling — top-6 cards + 22 FAQs by topic
src/app/globals.css           All styles (responsive, no framework)

src/components/               Shared UI: SiteHeader, SiteFooter, ProductCard,
                              ProductImage (emoji fallback), Countdown
src/lib/types.ts              TypeScript shapes of the catalog data
src/lib/catalog.ts            Typed data access + image path / slug helpers
src/lib/pricing.ts            Price range, discount %, promo months,
                              contract-total math (pure functions)
src/data/products.json        Catalog data: 73 products / 16 categories
                              + site config + reviews + faqs
public/images/                Self-hosted product photos (307 files, ~34 MB)
public/logo.svg               Site logo
```

## URLs

| Page            | Path                              |
| --------------- | --------------------------------- |
| Landing         | `/`                               |
| Catalog         | `/products` (`?category=<slug>`)  |
| Product detail  | `/products/<product-slug>`        |
| Calculator      | `/calculator` (`?slug=<product-slug>`) |
| Careship        | `/careship`                       |
| FAQ             | `/faq`                            |

## Data

`src/data/products.json` holds everything the UI renders (typed by
`src/lib/types.ts`):

- `site` — name, phone, LINE link + `lineId` (@384uicea), Facebook, Instagram,
  dealer line, `imageBase`
- `categories[]` — slug, Thai name, emoji, product count
- `products[]` — name, slug, category, image + `gallery[]`, prices
  (regular / promo), promo label, size variants, service plans, features,
  technologies, spec table, contract / warranty / service-interval /
  total-contract-value, `featured` flag
- `reviews`, `faqs`

To change contact channels, edit `site` in `src/data/products.json`.
(The old `data/products.js` regeneration step is gone — the JSON is imported
directly.)

### Changing product photos

1. Drop the new file into `public/images/products/` (any name).
2. Point that product's `image` and/or `gallery` entries in
   `src/data/products.json` at the new path (e.g. `/images/products/foo.jpg`).

`image` is the cover photo used on cards, the calculator, and OG tags.
`gallery` is the ordered photo list on the detail page (`gallery[0]` is the
default main image; with 0–1 items the thumbnail strip is hidden).

## Develop

```
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```
npm run build      # static site in out/
```

Upload `out/` to any static host. Set `NEXT_PUBLIC_SITE_URL` at build time
(e.g. `NEXT_PUBLIC_SITE_URL=https://example.com npm run build`) so Open Graph
image URLs, `sitemap.xml`, and `robots.txt` resolve to the real domain.

`npm run typecheck` runs the TypeScript compiler without emitting.
