import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { PcbTraceProvider } from "@/components/pcb/PcbTraceProvider";
import { PcbTraceLayer } from "@/components/pcb/PcbTraceLayer";
import { BootSequence, BOOT_SESSION_KEY } from "@/components/site/BootSequence";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { CapabilitiesGrid } from "@/components/site/CapabilitiesGrid";
import { ViaTransition } from "@/components/site/ViaTransition";
import { ShoalSection } from "@/components/site/ShoalSection";
import { Footer } from "@/components/site/Footer";
import { Modal } from "@/components/site/Modal";
import { InquiryForm } from "@/components/site/InquiryForm";

const HOME_URL = "https://deeplowlab.tech/";
const DEFAULT_OG_IMAGE = "https://deeplowlab.tech/og-image.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeepLow Lab — Building From The Silicon Up" },
      {
        name: "description",
        content:
          "DeepLow Lab builds embedded hardware, computer vision and edge AI for physical-world systems — plus web products through Shoal.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "DeepLow Lab — Building From The Silicon Up" },
      {
        property: "og:description",
        content:
          "Embedded hardware, computer vision and edge AI, engineered as one pipeline for physical-world problems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: HOME_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "DeepLow Lab — Building From The Silicon Up" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DeepLow Lab — Building From The Silicon Up" },
      {
        name: "twitter:description",
        content:
          "Embedded hardware, computer vision and edge AI, engineered as one pipeline for physical-world problems.",
      },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:image:alt", content: "DeepLow Lab — Building From The Silicon Up" },
    ],
    links: [
      { rel: "canonical", href: HOME_URL },
    ],
  }),
  component: Home,
});

function Home() {
  const [booting, setBooting] = useState(false);
  const [navRevealed, setNavRevealed] = useState(true);
  const [workOpen, setWorkOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    // Boot animation plays once per browser session.
    if (sessionStorage.getItem(BOOT_SESSION_KEY)) return;
    setBooting(true);
    setNavRevealed(false);
  }, []);

  const finishBoot = useCallback(() => {
    setBooting(false);
    setNavRevealed(true);
  }, []);

  return (
    <PcbTraceProvider>
      <div className="relative min-h-screen bg-void">
        {booting && <BootSequence onDone={finishBoot} />}
        <PcbTraceLayer />
        <Nav revealed={navRevealed} />
        <main>
          <Hero onViewWork={() => setWorkOpen(true)} onStartProject={() => setStartOpen(true)} />
          <CapabilitiesGrid />
          <ViaTransition />
          <ShoalSection />
        </main>
        <Footer />

        <Modal open={workOpen} onClose={() => setWorkOpen(false)} title="WORK / STATUS">
          <p className="text-[14px] font-light leading-[1.7] text-dim">
            Project in progress — not viewable yet. The case studies are still under fabrication.
            Check back soon.
          </p>
          <button
            type="button"
            className="btn-ghost-line mt-6 w-full"
            onClick={() => setWorkOpen(false)}
          >
            CLOSE
          </button>
        </Modal>

        <Modal open={startOpen} onClose={() => setStartOpen(false)} title="START A PROJECT">
          <p className="mb-5 text-[13px] font-light leading-[1.6] text-dim">
            Tell us what you want to build.
          </p>
          <InquiryForm sendEmail={true} />
        </Modal>
      </div>
    </PcbTraceProvider>
  );
}
