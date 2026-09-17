import { Reveal } from "./Reveal";

export function Hero({
  onViewWork,
  onStartProject,
}: {
  onViewWork: () => void;
  onStartProject: () => void;
}) {
  return (
    <section
      data-parallax-section
      className="relative z-[2] flex min-h-[70vh] items-center px-4 py-14 sm:px-6 md:min-h-screen md:justify-start md:px-12 md:py-20"
    >
      <div
        data-parallax-block
        className="relative w-full max-w-[820px] md:ml-[clamp(32px,7vw,120px)]"
      >
        <Reveal>
          <div className="eyebrow-dot mb-7 flex items-center gap-[10px] font-mono text-[11px] tracking-[2px] text-trace md:text-[12px]">
            DEEPLOW LAB
          </div>
          <h1 className="dot text-[28px] leading-[1.3] tracking-[0.5px] sm:text-[40px] md:text-[56px] md:leading-[1.25]">
            BUILDING FROM
            <br />
            THE <span className="text-trace">SILICON</span> UP.
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] font-light leading-[1.6] text-dim md:mt-7 md:text-[19px]">
            Embedded hardware, computer vision and edge AI for physical-world systems —
            engineered as one stack, not a list of disconnected services.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row md:mt-11 md:gap-4">
            <button type="button" className="btn-trace w-full sm:w-auto" onClick={onViewWork}>
              VIEW WORK
            </button>
            <button
              type="button"
              className="btn-ghost-line w-full sm:w-auto"
              onClick={onStartProject}
            >
              START A PROJECT
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
