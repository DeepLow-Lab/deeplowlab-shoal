import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const SERVICES = [
  { name: "Business & portfolio sites", meta: "FROM 2 WEEKS" },
  { name: "Web applications", meta: "CUSTOM SCOPE" },
  { name: "Ongoing maintenance", meta: "MONTHLY" },
];

export function ShoalSection() {
  return (
    <section
      id="shoal"
      data-parallax-section
      className="relative z-[2] flex min-h-[70vh] items-center px-4 py-14 sm:px-6 md:min-h-screen md:justify-start md:px-12 md:py-20"
      style={{ background: "linear-gradient(180deg, rgba(79,209,197,.03), transparent)" }}
    >
      <div
        data-parallax-block
        className="relative w-full max-w-full md:ml-[clamp(32px,7vw,120px)] md:max-w-[560px]"
      >
        <Reveal>
          <div className="mb-4 font-mono text-[10px] tracking-[1.5px] text-dim md:text-[12px] md:tracking-[2px]">
            <span className="text-surface">02</span> / DEPARTMENT
          </div>
          <div className="eyebrow-dot mb-7 flex items-center gap-[10px] font-mono text-[11px] tracking-[2px] text-surface md:text-[12px]">
            SHOAL / BY DEEPLOW LAB
          </div>
          <h2 className="dot mb-4 text-[22px] leading-[1.35] md:mb-[22px] md:text-[32px] md:leading-[1.4]">
            Where the deep work
            <br />
            becomes <span className="text-surface">visible.</span>
          </h2>
          <p className="max-w-[560px] text-[14px] font-light leading-[1.7] text-dim md:text-[17px]">
            Shoal is DeepLow Lab's web development arm — fast, clean sites and web products for
            businesses who need to be found, and found fast.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col md:mt-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="flex flex-col gap-1.5 border-b border-line py-4 md:flex-row md:items-center md:justify-between md:py-[22px]">
                <div className="text-[14px] font-medium md:text-[18px]">{s.name}</div>
                <div className="font-mono text-[10px] text-dim md:text-[12px]">{s.meta}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex md:mt-11">
          <Link to="/shoal" className="btn-surface inline-block w-full text-center sm:w-auto">
            TALK TO SHOAL
          </Link>
        </div>
      </div>
    </section>
  );
}
