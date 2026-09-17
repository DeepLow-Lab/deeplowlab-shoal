import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PcbTraceProvider } from "@/components/pcb/PcbTraceProvider";
import { PcbTraceLayer } from "@/components/pcb/PcbTraceLayer";
import { ViaTransition } from "@/components/site/ViaTransition";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Modal } from "@/components/site/Modal";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { SHOAL_SERVICES, MAINTENANCE_NOTE } from "@/config/shoalPricing";

const SHOAL_URL = "https://deeplowlab.tech/shoal";
const DEFAULT_OG_IMAGE = "https://deeplowlab.tech/og-image.png";

export const Route = createFileRoute("/shoal")({
  head: () => ({
    meta: [
      { title: "Shoal — Web Development by DeepLow Lab" },
      {
        name: "description",
        content:
          "Shoal offers Surface, Systems, Automation and Custom builds — from presence to web applications to workflow automation.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Shoal — Web Development by DeepLow Lab" },
      {
        property: "og:description",
        content: "Surface, Systems, Automation and Custom web builds, delivered by DeepLow Lab.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SHOAL_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Shoal — Web Development by DeepLow Lab" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shoal — Web Development by DeepLow Lab" },
      {
        name: "twitter:description",
        content: "Surface, Systems, Automation and Custom web builds, delivered by DeepLow Lab.",
      },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:image:alt", content: "Shoal — Web Development by DeepLow Lab" },
    ],
    links: [
      { rel: "canonical", href: SHOAL_URL },
    ],
  }),
  component: ShoalPage,
});

function ShoalPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <PcbTraceProvider parallax={false}>
      <div className="relative min-h-screen bg-void">
        <PcbTraceLayer intensity={0.45} />
        <Nav
          revealed
          accent="surface"
          links={[
            { label: "DEEPLOW LAB", href: "/", to: "/" },
            { label: "PRICING", href: "#pricing" },
            { label: "CONTACT", href: "#contact" },
          ]}
        />

        <main>
          {/* HERO */}
          <section className="relative z-[2] px-4 py-16 sm:px-6 md:px-12 md:py-24">
            <Reveal>
              <div className="mx-auto max-w-[900px]">
                <div className="eyebrow-dot mb-6 flex items-center gap-[10px] font-mono text-[11px] tracking-[2px] text-surface md:text-[12px]">
                  SHOAL / BY DEEPLOW LAB
                </div>
                <h1 className="dot text-[26px] leading-[1.3] tracking-[0.5px] md:text-[46px] md:leading-[1.25]">
                  WEB WORK, <span className="text-surface">SURFACED.</span>
                </h1>
                <p className="mt-5 max-w-[620px] text-[15px] font-light leading-[1.7] text-dim md:text-[18px]">
                  Shoal is DeepLow Lab's web development department. It turns digital presence,
                  operational web applications and workflow automation into one clear value ladder.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#pricing" className="btn-surface w-full text-center sm:w-auto">
                    SEE PRICING
                  </a>
                  <button
                    type="button"
                    className="btn-ghost-line w-full sm:w-auto"
                    onClick={() => setProductsOpen(true)}
                  >
                    SEE SHOAL PRODUCTS
                  </button>
                  <Link to="/" className="btn-ghost-line w-full text-center sm:w-auto">
                    BACK TO DEEPLOW LAB
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>

          <ViaTransition />

          {/* PRICING */}
          <section id="pricing" className="relative z-[2] px-4 py-12 sm:px-6 md:px-12 md:py-20">
            <div className="mx-auto max-w-[1100px]">
              <Reveal>
                <div className="mb-4 font-mono text-[10px] tracking-[2px] text-dim md:text-[12px]">
                  <span className="text-surface">01</span> / SERVICES
                </div>
                <h2 className="dot mb-3 text-[20px] leading-[1.4] md:text-[28px]">
                  Pick the right starting point.
                </h2>
                <p className="max-w-[560px] text-[14px] font-light leading-[1.7] text-dim md:text-[16px]">
                  Click any card to open a project inquiry — the type is filled in for you.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SHOAL_SERVICES.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.06}>
                    <button
                      type="button"
                      onClick={() => setSelected(s.name)}
                      aria-label={`Inquire about ${s.name}`}
                      className="flex h-full w-full flex-col border border-line bg-panel p-6 text-left transition-colors hover:border-surface focus:border-surface focus:outline-none"
                    >
                      <div className="font-mono text-[11px] tracking-[1px] text-surface">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="dot mt-3 text-[14px] tracking-[0.5px] md:text-[16px]">
                        {s.name}
                      </h3>
                      <p className="mt-3 text-[13px] font-light leading-[1.6] text-dim">
                        {s.blurb}
                      </p>
                      {s.features.length > 0 && (
                        <ul className="mt-5 space-y-2">
                          {s.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 text-[13px] font-light text-dim"
                            >
                              <span className="mt-[7px] h-[5px] w-[5px] flex-none rounded-full bg-surface" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-auto pt-6 font-mono text-[12px] text-signal">
                        {s.price}
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* MAINTENANCE */}
          <section className="relative z-[2] px-4 pb-16 sm:px-6 md:px-12 md:pb-24">
            <Reveal>
              <div
                className="mx-auto max-w-[1100px] border border-line p-6 md:p-8"
                style={{ background: "linear-gradient(90deg, rgba(79,209,197,.06), transparent)" }}
              >
                <div className="font-mono text-[11px] tracking-[2px] text-surface">
                  / MAINTENANCE
                </div>
                <p className="mt-3 max-w-[720px] text-[14px] font-light leading-[1.7] text-signal md:text-[16px]">
                  {MAINTENANCE_NOTE}
                </p>
              </div>
            </Reveal>
          </section>
        </main>

        <Footer />

        <Modal
          open={selected !== null}
          onClose={() => setSelected(null)}
          title={`INQUIRY / ${selected ?? ""}`}
          accent="surface"
        >
          <p className="mb-5 text-[13px] font-light leading-[1.6] text-dim">
            Tell us about the project. We reply within a couple of days.
          </p>
          <InquiryForm accent="surface" projectType={selected ?? ""} />
        </Modal>

        <Modal
          open={productsOpen}
          onClose={() => setProductsOpen(false)}
          title="SHOAL PRODUCTS"
          accent="surface"
        >
          <p className="text-[14px] font-light leading-[1.7] text-dim">
            No products yet — check back soon.
          </p>
          <button
            type="button"
            className="btn-ghost-line mt-6 w-full"
            onClick={() => setProductsOpen(false)}
          >
            CLOSE
          </button>
        </Modal>
      </div>
    </PcbTraceProvider>
  );
}
