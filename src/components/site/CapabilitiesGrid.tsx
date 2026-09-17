import { Reveal } from "./Reveal";

const PIPELINE_STAGES = [
  {
    num: "01",
    title: "Sensing",
    body: "Cameras and sensors turn the physical environment into usable signals.",
  },
  {
    num: "02",
    title: "Embedded + Custom PCB",
    body: "Custom hardware and board design bring power, timing, and interfaces under control.",
  },
  {
    num: "03",
    title: "Computer Vision",
    body: "Perception models detect, track, and extract meaning in real time.",
  },
  {
    num: "04",
    title: "Edge AI / Decision",
    body: "On-device intelligence turns perception into decisions with low latency.",
  },
  {
    num: "05",
    title: "Action / Deployment",
    body: "Systems ship into the field and drive the physical outcome.",
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
        className="relative w-full max-w-full md:mr-[clamp(16px,4vw,64px)] md:max-w-[760px] lg:max-w-[920px] xl:max-w-[1040px]"
      >
        <Reveal>
          <div className="mb-4 font-mono text-[10px] tracking-[1.5px] text-dim md:text-[12px] md:tracking-[2px]">
            <span className="text-trace">01</span> / CAPABILITIES
          </div>
          <h2 className="dot mb-4 max-w-[640px] text-[22px] leading-[1.35] md:mb-[22px] md:text-[32px] md:leading-[1.4]">
            One pipeline for physical-world systems.
            <br />
            Built from sensing to deployment.
          </h2>
          <p className="max-w-[560px] text-[14px] font-light leading-[1.7] text-dim md:text-[17px]">
            DeepLow Lab builds systems for the physical world — combining embedded hardware,
            computer vision, and edge AI into one working pipeline, not separate disconnected
            services.
          </p>
        </Reveal>

        <div className="mt-8 md:mt-14">
          <Reveal>
            <div data-parallax-card className="relative border border-line bg-panel p-4 md:p-6">
              <div className="hidden md:block">
                <div className="pointer-events-none absolute left-6 right-6 top-[74px] h-px bg-line lg:left-8 lg:right-8" />
              </div>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-5 md:gap-4 lg:gap-5">
                {PIPELINE_STAGES.map((stage, index) => (
                  <div key={stage.num} className="relative min-w-0 md:px-1">
                    <div className="flex items-center gap-3 md:relative md:z-[1] md:flex-col md:items-start md:gap-4">
                      <div
                        className="h-3 w-3 rounded-full border border-surface bg-void md:h-3.5 md:w-3.5"
                        style={{ boxShadow: "0 0 12px var(--surface)" }}
                      />
                      <div className="font-mono text-[10px] text-trace md:text-[12px]">
                        {stage.num}
                      </div>
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold md:mt-8 md:text-[16px] lg:text-[17px]">
                      {stage.title}
                    </h3>
                    <p className="mt-2 max-w-[220px] text-[12px] font-light leading-[1.6] text-dim md:max-w-none md:text-[13px] lg:text-[14px]">
                      {stage.body}
                    </p>

                    {index < PIPELINE_STAGES.length - 1 && (
                      <div className="my-5 flex items-center justify-center md:hidden">
                        <div className="relative h-px w-10 bg-line">
                          <span
                            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-trace bg-void"
                            style={{ boxShadow: "0 0 12px var(--trace)" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
