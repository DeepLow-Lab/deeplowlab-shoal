# DeepLow Lab — Personal Dev Guide

This file is for you (the site owner), not for GitHub visitors. It is listed in
`.gitignore` so it never gets committed. `README.md` stays as the public file.

---

## 1. What the site is

Two pages:

- **`/`** — the DeepLow Lab landing experience: boot animation → nav → hero →
  capabilities → via transition → Shoal section → footer. One long scroll,
  anchor links only (`#work`, `#shoal`, `#contact`).
- **`/shoal`** — a lighter secondary page for the Shoal web-dev department:
  hero, pricing cards, maintenance banner, footer.

A green "greet dot" rides a PCB trace drawn behind the whole page as you scroll,
from the very top to the very bottom.

## 2. Tech stack (important)

This project runs on **TanStack Start** (React 19 + Vite + TypeScript), not
Next.js — that's what the Lovable platform builds with. Practically it works the
same way as App Router: files inside `src/routes/` become URLs.

- `src/routes/index.tsx` → `/`
- `src/routes/shoal.tsx` → `/shoal`
- `src/routes/__root.tsx` → the shared HTML shell (fonts, meta tags)
- `src/routeTree.gen.ts` is auto-generated — **never edit it**.

Styling is **Tailwind v4**, configured in CSS (there is no `tailwind.config.ts`
in Tailwind v4 — the theme lives in `src/styles.css`). Animations use
**Framer Motion**. Fonts are loaded from Google Fonts via a `<link>` in
`__root.tsx`.

## 3. Design tokens

All colors live in `src/styles.css` under `:root`:

| Token      | Value     | Used for                  |
| ---------- | --------- | ------------------------- |
| `--void`   | `#0B0D0F` | page background           |
| `--panel`  | `#14181B` | cards / modals            |
| `--trace`  | `#39D98A` | DeepLow Lab accent (green)|
| `--surface`| `#4FD1C5` | Shoal accent (teal)       |
| `--signal` | `#ECEFEC` | primary text              |
| `--dim`    | `#7C8A85` | secondary text            |
| `--line`   | `#23292C` | borders                   |

They are exposed as Tailwind classes: `bg-void`, `text-trace`, `border-line`,
`bg-panel`, `text-dim`, `text-surface`, etc. Change a hex in `:root` and the
whole site follows.

Fonts: `.dot` / `font-display` = Silkscreen (headlines and wordmarks only),
`font-sans` = Space Grotesk (body), `font-mono` = JetBrains Mono (labels/stats).

Reusable button styles are CSS utilities in the same file: `btn-trace`,
`btn-surface`, `btn-ghost-line`, plus `field-input` for form fields.

## 4. Folder map

```
src/
  config/shoalPricing.ts        <- EDIT PRICES HERE
  hooks/usePcbTrace.ts          <- trace geometry + parallax + greet dot
  components/
    pcb/PcbTraceProvider.tsx    <- shares the hook with the page
    pcb/PcbTraceLayer.tsx       <- draws the dot grid + SVG trace
    site/BootSequence.tsx       <- letter ignition + FLIP into nav
    site/Nav.tsx                <- sticky top bar (both pages)
    site/Hero.tsx               <- homepage hero + 2 buttons
    site/CapabilitiesGrid.tsx   <- 4 capability cards
    site/ViaTransition.tsx      <- the teal fork dot (trace measures this)
    site/ShoalSection.tsx       <- Shoal block on the homepage
    site/Footer.tsx             <- footer with social icons
    site/Modal.tsx              <- accessible modal (Esc / click-out / X)
    site/InquiryForm.tsx        <- shared form + EmailJS wiring
    site/Reveal.tsx             <- fade-up-on-scroll wrapper
  routes/index.tsx, routes/shoal.tsx, routes/__root.tsx
```

## 5. `usePcbTrace` — the trace hook

Lives in `src/hooks/usePcbTrace.ts`. It does three jobs:

1. **Builds the trace geometry.** Only `M` and `L` commands, only horizontal and
   vertical segments — orthogonal like a real PCB, never curves. Desktop and
   mobile (`<= 640px`) get different route shapes.
2. **Finds the fork point from the real DOM.** `getDocumentTop()` walks
   `offsetTop`/`offsetParent` up from the `ViaTransition` element, so the branch
   splits exactly where the teal dot sits — not at a guessed percentage.
3. **Parallax + greet dot.** On mount and on resize it calls
   `captureOriginalOffsets()`, which resets transforms and stores each element's
   untransformed document offset in a `WeakMap`. The scroll handler only reads
   those stored numbers (never `getBoundingClientRect`), so offsets can't
   compound, and all work is wrapped in `requestAnimationFrame`.

Elements opt into parallax with data attributes:
`data-parallax-section` (0.08), `data-parallax-block` (0.04),
`data-parallax-card` (0.03 + subtle scale).

**Responsive rule:** parallax and the greet dot only run at `>= 969px`. Below
that everything is reset to `transform: none` and the pulse radius is `0` — a
static simplified trace, matching the mockup's mobile fallback.

The greet dot rides `pulsePath`, which is the stem joined to the exit branch as
one continuous line running to the bottom of the page, so it accompanies the
visitor all the way to the footer.

`PcbTraceProvider` runs the hook once per page and shares it; `PcbTraceLayer`
just draws. `/shoal` passes `parallax={false}` and `intensity={0.45}` so the
secondary page stays lighter.

## 6. Boot sequence

`src/components/site/BootSequence.tsx`. Letters of `DEEPLOW_LAB` fade in one by
one (60ms apart) with a glowing underline "trace". When typing finishes it
measures the nav wordmark (`id="navWordmark"`) and the boot logo, computes the
delta, and Framer Motion animates the logo into that exact position (FLIP).
Then the overlay fades out and the nav fades in.

It writes `dlb_boot_played` to **sessionStorage**, and `index.tsx` checks that
key on mount — so the animation plays once per browser session, not on every
internal navigation or reload.

To force it while developing: clear session storage or run
`sessionStorage.removeItem('dlb_boot_played')` in the console.

## 7. Buttons and what they do

Homepage (`src/routes/index.tsx`):

- **VIEW WORK** → opens a modal: "Project in progress — not viewable yet."
- **START A PROJECT** → opens a modal with the inquiry form. It is rendered with
  `sendEmail={false}`, so it never calls EmailJS — it just confirms locally.
  When you want it live, change that prop to `true`.
- **TALK TO SHOAL** (in `ShoalSection.tsx`) → navigates to `/shoal`.

Shoal page (`src/routes/shoal.tsx`):

- **Any pricing card** → opens the inquiry modal with the project type prefilled
  from the card you clicked.
- **SEE SHOAL PRODUCTS** → modal: "No products yet — check back soon."
- **SEE PRICING** → scrolls to `#pricing`. **BACK TO DEEPLOW LAB** → `/`.

All modals close with Escape, the X button, or clicking the backdrop, and every
form field has a real `<label>`.

## 8. Editing prices and services

Everything is in **`src/config/shoalPricing.ts`**. One array,
`SHOAL_SERVICES`, with `{ id, name, price, blurb, features[] }`. Change the
`price` strings (currently `"Starting at $XXX"` / `"Contact for pricing"`), add
or remove bullets, reorder, or add a whole new card — the page renders from the
array, nothing is hardcoded in JSX.

`MAINTENANCE_NOTE` in the same file is the text in the maintenance banner
(currently: free for 3 months after deployment, paid monthly after that).

## 9. EmailJS — what to replace

In **`src/components/site/InquiryForm.tsx`**, top of the file:

```ts
export const SHOAL_EMAILJS_SERVICE_ID  = "REPLACE_ME_SERVICE_ID";
export const SHOAL_EMAILJS_TEMPLATE_ID = "REPLACE_ME_TEMPLATE_ID";
export const SHOAL_EMAILJS_PUBLIC_KEY  = "REPLACE_ME_PUBLIC_KEY";
```

Get them from emailjs.com (Email Services → service ID, Email Templates →
template ID, Account → public key) and paste them in. Until you do, the form
detects the placeholder and just shows a local confirmation instead of failing.

The template variables sent are: `from_name`, `reply_to`, `project_type`,
`message` — use those names in your EmailJS template.

## 10. Deploying

The site is fully client-rendered content with no server functions, so it
deploys as a normal static/edge build. Publish from Lovable, or build with
`npm run build` and deploy the output (Netlify: build command `npm run build`).

## 11. Common tweaks

- **Change trace shape** → `buildGeometry()` in `usePcbTrace.ts`. Keep every
  segment horizontal or vertical.
- **Change parallax strength** → the `0.08 / 0.04 / 0.03` factors in `update()`.
- **Change the mobile cutoff** → `MOBILE_MAX` (640) and `DESKTOP_MIN` (969).
- **Add a page** → create `src/routes/whatever.tsx` with `createFileRoute`; the
  route tree regenerates automatically.
- **Add a social icon** → the `SOCIALS` array at the top of `Footer.tsx`
  (icons come from `lucide-react`; links are placeholders right now).
