# GQNET POS — Next.js backend

Rewrite of the GQNET product/POS backend (originally ASP.NET Core + MSSQL)
as Next.js API routes on Supabase (Postgres), deployable on Vercel.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in SUPABASE_SERVICE_ROLE_KEY
npm run dev
```

`SUPABASE_SERVICE_ROLE_KEY` comes from your Supabase project's
**Settings → API** page (the `service_role` secret key, not `anon`).
It must stay server-side only — never prefix it with `NEXT_PUBLIC_`.

## What's built

- `lib/supabase.ts` — server-side Supabase client
- `lib/types.ts` — TypeScript types for every table
- `app/api/checkout` — calls the `checkout` Postgres function (atomic:
  validates stock/price, decrements inventory, inserts `sale`/`sale_detail`
  in one transaction)
- `app/api/pos-lookup/[prodCode]` — product/price/stock lookup for the
  cashier page
- `app/api/products` (+ `[prodCode]`) — full CRUD, the template to follow
  for the rest

## Still to port (same pattern as `app/api/products`)

`prod-category`, `product-category`, `product-category-detail`,
`price-scheme`, `price-restriction`, `service`, `prod-attributes`,
`prod-attributes-desc`, `valid-country`, `customer`.

## Known TODOs in the code

- `service_type_id = 1` is assumed to mean "Shipping" — confirm this
  matches your real convention (search for the TODO comments).
- Price/fee selection picks the most-recently-added `price_scheme`/`service`
  row per product. Replace with real "current active price" logic
  (dates/country) if you have specific business rules for that.

## Deploying

Push this to a GitHub repo, then in the Vercel dashboard use
**Add New → Project → Import Git Repository** and select it. Add
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` under the project's
Environment Variables before the first deploy.
