import { usePcbTraceContext } from "./PcbTraceProvider";

/**
 * Renders the fixed dot grid background plus the orthogonal SVG PCB trace.
 * All geometry/parallax logic lives in usePcbTrace.
 */
export function PcbTraceLayer({ intensity = 1 }: { intensity?: number }) {
  const { geometry, gridRef, pulsePathRef, pulseRef } = usePcbTraceContext();
  const g = geometry;

  return (
    <>
      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none fixed z-0 will-change-transform"
        style={{
          inset: "-10% -10%",
          backgroundImage: "radial-gradient(circle, #1c2124 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5 * intensity,
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[1]"
        width={g.width}
        height={g.height}
        viewBox={`0 0 ${g.width} ${g.height}`}
        preserveAspectRatio="none"
        style={{ opacity: intensity }}
      >
        <defs>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#39D98A" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#4FD1C5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#39D98A" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Continuous stem + exit branch — the greet dot rides this one. */}
        <path
          ref={pulsePathRef}
          d={g.pulsePath}
          fill="none"
          stroke="url(#traceGrad)"
          strokeWidth={g.strokeWidth}
          opacity="0.6"
        />
        <path
          d={g.branchAPath}
          fill="none"
          stroke="url(#traceGrad)"
          strokeWidth={g.strokeWidth}
          opacity="0.45"
        />

        {!g.isMobile && (
          <g>
            <circle
              cx={g.xCenter}
              cy={g.viaY}
              r="10"
              fill="none"
              stroke="#4FD1C5"
              strokeWidth="2"
              opacity="0.5"
            />
            <circle
              cx={g.xLeft}
              cy={g.upperJog}
              r="8"
              fill="none"
              stroke="#39D98A"
              strokeWidth="2"
              opacity="0.4"
            />
            <circle
              cx={g.xRight}
              cy={g.lowerJog}
              r="8"
              fill="none"
              stroke="#39D98A"
              strokeWidth="2"
              opacity="0.4"
            />
          </g>
        )}

        {/* Greet dot */}
        <circle
          ref={pulseRef}
          cx={g.isMobile ? g.xCenter : g.xLeft}
          cy={0}
          r={0}
          fill="#39D98A"
          opacity="0.9"
          style={{ filter: "drop-shadow(0 0 6px #4FD1C5)" }}
        />
      </svg>
    </>
  );
}
