import { Reveal } from "./Reveal";

const CAPABILITIES = [
  {
    num: "SW.01",
    title: "Efficient Software",
    body: "Lean, low-level systems programming — firmware, drivers, and performance-critical software built for constrained hardware.",
  },
  {
    num: "HW.02",
    title: "PCB Design",
    body: "Schematic to fabrication — custom board design for sensing, control, and embedded product prototypes.",
  },
  {
    num: "CV.03",
    title: "Computer Vision",
    body: "Perception systems for robots and physical environments — detection, tracking, and real-time inference on-device.",
  },
  {
    num: "AI.04",
    title: "Physical AI",
    body: "Intelligence that acts in the real world — control systems, robotics, and embodied AI research and builds.",
  },
];

export function CapabilitiesGrid() {
  return (
    <section
      id="work"
      data-parallax-section
      className="relative z-[2] flex min-h-[70vh] items-center px-4 py-14 sm:px-6 md:min-h-screen md:justify-end md:px-12 md:py-20"
    >
      <div
        data-parallax-block
        className="relative w-full max-w-full md:mr-[clamp(16px,4vw,64px)] md:max-w-[560px]"
      >
        <Reveal>
          <div className="mb-4 font-mono text-[10px] tracking-[1.5px] text-dim md:text-[12px] md:tracking-[2px]">
            <span className="text-trace">01</span> / CAPABILITIES
          </div>
          <h2 className="dot mb-4 max-w-[640px] text-[22px] leading-[1.35] md:mb-[22px] md:text-[32px] md:leading-[1.4]">
            Four disciplines, one team.
            <br />
            We go as deep as the problem needs.
          </h2>
          <p className="max-w-[560px] text-[14px] font-light leading-[1.7] text-dim md:text-[17px]">
            DeepLow Lab operates at the layer most software companies skip — where code meets
            copper.
          </p>
        </Reveal>

        <div className="mt-8 grid w-full grid-cols-1 gap-4 md:mt-14 md:gap-8">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.num} delay={i * 0.08}>
              <div
                data-parallax-card
                className="max-w-full border border-line bg-panel p-5 will-change-transform md:max-w-[480px] md:p-8"
                style={{ marginLeft: i % 2 === 1 ? "auto" : 0 }}
              >
                <div className="mb-3 font-mono text-[10px] text-trace md:text-[12px]">{c.num}</div>
                <h3 className="mb-2 text-[15px] font-semibold md:text-[18px]">{c.title}</h3>
                <p className="text-[12px] font-light leading-[1.6] text-dim md:text-[14px]">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
