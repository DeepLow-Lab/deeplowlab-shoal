# DeepLow Lab Shoal

I want to turn this HTML/CSS/JS mockup into a real Next.js website. The mockup file is already fixed (orthogonal PCB trace routing, via-transition-synced fork point, and non-compounding parallax using stored original offsets + requestAnimationFrame) — treat it as the reference implementation for visuals and animation logic, not something to redesign.

PROJECT: DeepLow Lab website (a tech/robotics company with a web-dev sub-department called Shoal)

TECH STACK (use exactly this, no substitutions):
- Next.js with App Router + TypeScript
- Tailwind CSS for styling — set up the color/type tokens below as a proper tailwind.config.ts theme, not inline hex values
- Framer Motion for the boot sequence animation and scroll-reveal transitions
- Fonts loaded via next/font/google: Silkscreen (headlines/wordmarks/numbers only, never body text), Space Grotesk (body copy), JetBrains Mono (small data labels/stats)
- Deployment target is Netlify — set up the project to be Netlify-compatible (no serverless features that break static/edge export unless necessary)

DESIGN TOKENS (from the mockup, keep exact):
- --void: #0B0D0F (background)
- --panel: #14181B (card backgrounds)
- --trace: #39D98A (DeepLow Lab accent, circuit green)
- --surface: #4FD1C5 (Shoal accent, teal)
- --signal: #ECEFEC (primary text)
- --dim: #7C8A85 (secondary/muted text)
- --line: #23292C (borders/dividers)

STRUCTURE:
- Route structure: app/ with the DeepLow Lab core content at "/" and a distinct Shoal section within the same page (anchor-linked, as in the mockup) — keep it a single-page scroll experience for now, not separate routes, matching the mockup's structure (hero → capabilities → via-transition → shoal → footer)
- Componentize logically: BootSequence, Nav, Hero, CapabilitiesGrid, ViaTransition, ShoalSection, Footer, and a PcbTraceLayer component that owns the SVG trace + parallax logic
- Extract the trace/parallax logic into a custom hook (e.g. usePcbTrace) so PcbTraceLayer stays clean — this hook must generate an orthogonal-only path (no bezier curves), must compute the fork point from the ViaTransition element's actual DOM position (not a percentage estimate), and must use stored original offsets (captured on mount/resize) rather than live getBoundingClientRect() calls inside the scroll handler, wrapped in requestAnimationFrame. The greet dot should accompanies the user througout all the website, it should get to the end. and make better footer, with social icons but the should respect the design language of DeepLow Lab
- Boot sequence: replicate the mockup's letter-by-letter "DEEPLOW_LAB" ignition animation using Framer Motion, followed by a FLIP-style animation into the nav's final wordmark position, then reveal the page. Should only play once per session (use sessionStorage so it doesn't replay on internal navigation/reload within the same session)
- Responsive behavior: mobile (<969px) gets the simplified static trace with no parallax and no traveling pulse, matching the mockup's mobile fallback exactly; desktop (>=969px) gets the full parallax + traveling signal pulse experience



PROJECT DOCUMENTATION — IMPORTANT, READ CAREFULLY:
Create a file that is NOT the README.md (the README.md must still exist normally in the repo, for GitHub visitors). This second file is for my own personal understanding of the codebase, not for public/collaborator use. Requirements for this file:
- Name it something like PROJECT_GUIDE.md or DEV_GUIDE.md (your choice, just not README.md)
- Add it to .gitignore so it never gets committed or pushed to the repo
- Its content should explain, in plain language: what the site does, how the project is structured (folders/components), what each key function/hook does (especially usePcbTrace, the boot sequence logic, and the button/scroll behavior), and anything I'd need to know to modify or extend the site later
- Write it as if explaining the codebase to me, the site owner, who is not deeply familiar with Next.js internals — clear, practical, not a formal engineering doc
- Keep it updated as you build — if you add new key functions or components later in this session, append/update this file to reflect them

Build this step by step: start with project scaffolding and Tailwind/font config, then the design tokens, then static layout/sections, then the boot sequence, then the PCB trace + parallax hook, then wire up the buttons, then generate the guide file last (once the structure is final) so it accurately reflects what was actually built.
Continuing work on the DeepLow Lab / Shoal Next.js site. This prompt updates the button behaviors and adds a new /shoal page. Keep everything from the previous build (design tokens, PcbTraceLayer/usePcbTrace hook, boot sequence, component structure) — this only changes button destinations and adds new pages/components.

UPDATED BUTTON BEHAVIOR:

1. "VIEW WORK" (hero, DeepLow Lab core) — no longer scrolls to Capabilities. On click, show a simple message/modal or inline state indicating the project is ongoing and cannot be visited yet (something like "Project in progress — not viewable yet"). Keep it low-effort: a small toast/modal is fine, doesn't need a new route.

2. "START A PROJECT" (hero, DeepLow Lab core) — opens a placeholder inquiry form (modal or inline section) asking the user to describe their project. This is NOT wired to EmailJS yet — just build the form UI with a textarea/fields and a submit button that I can wire up later. Fields: name, email, project description (textarea), submit button.

3. "TALK TO SHOAL" (Shoal section, on the main page) — no longer opens mailto or a same-page form. Instead, it navigates to a new page/route at /shoal.

NEW PAGE: /shoal (route: app/shoal/page.tsx)

This is a dedicated page for the Shoal web-dev department, in the same visual system (dark theme, teal/#4FD1C5 accent since this is Shoal, Silkscreen for headlines, PCB trace background elements can carry over at reduced/simplified intensity — this is a secondary page, not the main landing experience, so keep it lighter-weight than the homepage).

Sections on /shoal:

a) Header/hero for the page — short intro reintroducing Shoal ("Shoal, by DeepLow Lab" or similar), with a nav back to the main DeepLow Lab site.

b) Pricing cards grid — one card per service:
   - Static Website — includes: HTML/CSS/JavaScript build, deployment, domain name setup
   - Dynamic Website — includes: database, front-end, back-end, deployment, domain name setup
   - E-commerce — placeholder feature list (you can draft reasonable bullet points: product catalog, cart/checkout, payment integration, deployment, domain name)
   - Teaching Platform — placeholder feature list (course/content management, user accounts, video/content delivery, deployment, domain name)
   - Custom — a card with no fixed feature list, just messaging like "Have something else in mind? Tell us about it" 
   
   Use placeholder pricing (e.g. "Starting at $XXX" or "Contact for pricing" — I'll fill in real numbers later, just make the price field easy to find/edit in the code, ideally as a simple config object or array at the top of the component, not hardcoded deep in JSX).

   Each pricing card is clickable. Clicking ANY card (including Custom) opens a project-inquiry form (modal or inline) with placeholder fields: name, email, project type (should auto-fill/reflect which card was clicked), and a description textarea. This form should be built to integrate with EmailJS — set it up with emailjs-com (or @emailjs/browser) properly wired for submission, but use placeholder values for service_id, template_id, and public_key (clearly marked as placeholders in the code, e.g. as named constants at the top of the file like SHOAL_EMAILJS_SERVICE_ID = "REPLACE_ME") so I can paste in my real EmailJS credentials afterward without digging through the component.

c) Maintenance note — a clearly visible section or banner stating that ongoing maintenance becomes a paid service starting 3 months after deployment. Keep the tone simple and professional, not buried in fine print.

d) "SEE SHOAL PRODUCTS" button — place this prominently on the page (e.g. near the top or in its own section). Since there are no products yet, clicking it should show a simple "No products yet — check back soon" message (toast, modal, or inline state, your choice, keep it simple).

GENERAL REQUIREMENTS:
- Keep all new forms/modals accessible (proper labels, focusable, dismissible via Escape/close button)
- Keep the pricing config (service names, feature lists, prices) in an easily editable single object/array, not scattered across JSX, since I'll be updating prices and offerings over time
- Update the PROJECT_GUIDE.md (or DEV_GUIDE.md, whichever you created earlier — do NOT create README.md, and make sure this guide file is still listed in .gitignore) to reflect: the new /shoal route, the pricing config location and how to edit it, where the EmailJS placeholder constants are and what I need to replace them with, and how the "View Work" and "Start a Project" placeholder states work.

Build in this order: /shoal page layout and pricing cards first, then the click-to-open-form behavior with EmailJS scaffolding, then the maintenance banner and Shoal Products placeholder button, then update the three homepage button behaviors, then update the guide file last.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e2cad696-6e34-487a-b8c2-8121928abac6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
