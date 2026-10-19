# M.S. ENTERPRISES

A responsive, animated product storefront demo for an AC and electronics PCB supplier. Built with React, Vite, Tailwind CSS, Framer Motion, Lucide React, and React Router.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Features

- Responsive retail storefront with brand → appliance → part navigation, searchable products, animated filters, and testimonials.
- Interactive cart drawer with quantity controls, item removal, subtotal, and add-to-cart animation.
- Retail product pricing, stock availability, and client-side product search/filtering.
- Individual product detail pages, delivery-information checkout, animated order confirmation, branded 404 page, and success/error notifications.
- Customer account panel with browser-persisted cart, saved delivery details, order history, current-order progress, and demo payment status.
- Static UPI/card payment simulator with success/failure outcomes; failed attempts preserve the cart for retry.
- Floating WhatsApp support shortcut to `+91 89200 91473`.
- Responsive customer-account sidebar with demo sign-in/sign-out and saved order, cart, and profile sections.
- Persistent light/dark theme toggle.
- Scroll progress, page loading, responsive navigation, and motion effects.
- Product catalogue and category data are centralized in `src/data/products.js`.

## Project structure

```text
src/
  components/
    Footer.jsx
    Hero.jsx
    Navbar.jsx
    Overlays.jsx
    ProductCard.jsx
    SectionHeading.jsx
    StorePages.jsx
    StoreSections.jsx
  data/
    products.js
  App.jsx
  index.css
  main.jsx
```

Reusable presentation pieces (including `ProductCard` and `SectionHeading`) are shared across the storefront. Tailwind utility classes handle component styling; `index.css` only loads Tailwind.

## Demo notes

This is a frontend-only client demo. Checkout and newsletter signup do not call a backend or process orders. Product photography is loaded from Unsplash and requires an internet connection.

Product routes use `/products/:productId`, checkout uses `/checkout`, customer tracking uses `/account`, and unknown routes show the custom 404 page. UPI/card payment is simulated locally, with explicit success and failure test paths; there is no payment gateway, charge, or real transaction. Cart, customer, order, demo account session, and theme preference are persisted to browser `localStorage`; they are local to that browser and are not synced across devices or accounts. Demo account sign-in has no password and is not secure authentication. Payment and carrier tracking are demo statuses only. Static hosting should rewrite application routes to `index.html` so React Router can render these pages.
