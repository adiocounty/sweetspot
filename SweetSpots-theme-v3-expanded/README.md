# SweetSpots Theme (Submission-Ready)

## What’s Included
- Shopify-compatible JSON templates (collection, list-collections, gift card, password, etc.).
- Required core sections plus app-block enabled sections (product, blog, article, search, cart, list collections, custom liquid).
- SEO/OG/meta, breadcrumbs with schema, structured data for product/article/org.
- Accessibility basics: skip link, form labels, focus styles, aria labels.

## Quick Start
```bash
# From the theme root
npx @shopify/cli@latest theme dev --store ptukb4-1c.myshopify.com --password YOUR_TOKEN --path . --host 127.0.0.1 --port 9292 --open
```
- Use your Theme Access token in place of `YOUR_TOKEN`.
- The command will print:
  - Local hot-reload preview (127.0.0.1:9292)
  - Admin editor link
  - Shareable preview link

## Push to Store
```bash
npx @shopify/cli@latest theme push --store ptukb4-1c.myshopify.com --password YOUR_TOKEN --path .
```

## Submission Checklist (pass/fail ready)
- Theme Check: clean (0 offenses).
- Required templates present: 404, article, blog, cart, collection, index, page, password, product, search, list-collections, gift_card.
- Required sections present: main-page/password header+footer+main, list-collections, collection banner/product grid, cart items/footer, custom-liquid, main product/blog/article/search, header/footer/announcement.
- App blocks allowed on primary sections.
- Basic SEO + schema in `layout/theme.liquid`, `snippets/structured-data.liquid`, `snippets/breadcrumbs.liquid`.
- Locale strings present for new keys.

## Support
If Theme Check or CLI prompts for login, re-run with `--password YOUR_TOKEN` or `npx @shopify/cli@latest auth login` interactively.***
