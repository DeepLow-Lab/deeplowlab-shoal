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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeepLow Lab — Building From The Silicon Up" },
      {
        name: "description",
        content:
          "DeepLow Lab builds efficient software, custom PCBs, computer vision and physical AI — plus web products through Shoal.",
      },
      { property: "og:title", content: "DeepLow Lab — Building From The Silicon Up" },
      {
        property: "og:description",
        content:
          "Efficient software, custom PCBs, computer vision and physical AI, engineered from first principles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
            Tell us what you want to build. This form is a placeholder — wire it to email later.
          </p>
          <InquiryForm sendEmail={false} />
        </Modal>
      </div>
    </PcbTraceProvider>
  );
}
