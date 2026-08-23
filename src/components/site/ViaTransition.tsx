import { usePcbTraceContext } from "@/components/pcb/PcbTraceProvider";

/**
 * The fork point of the trace. usePcbTrace measures this element's real DOM
 * position to place the branch — do not replace with a percentage estimate.
 */
export function ViaTransition() {
  const { viaRef } = usePcbTraceContext();

  return (
    <div
      ref={viaRef}
      className="relative z-[2] flex flex-col items-center px-4 pb-5 pt-10 md:pb-10 md:pt-[100px]"
    >
      <div
        className="mb-3 h-3 w-3 rounded-full md:mb-[18px] md:h-[14px] md:w-[14px]"
        style={{ background: "var(--surface)", boxShadow: "0 0 20px var(--surface)" }}
      />
      <div className="font-mono text-[9px] tracking-[2px] text-dim md:text-[11px] md:tracking-[3px]">
        SIGNAL ROUTED TO SURFACE
      </div>
    </div>
  );
}
