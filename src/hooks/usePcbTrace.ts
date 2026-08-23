import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Geometry of the PCB trace drawn behind the page.
 * All segments are orthogonal (only horizontal / vertical L commands) —
 * never introduce bezier curves here, real PCB traces don't do that.
 */
export type TraceGeometry = {
  width: number;
  height: number;
  isMobile: boolean;
  xLeft: number;
  xRight: number;
  xCenter: number;
  viaY: number;
  upperJog: number;
  lowerJog: number;
  stemPath: string;
  branchAPath: string;
  branchBPath: string;
  /** stem + branchB joined: the single continuous route the greet dot rides. */
  pulsePath: string;
  strokeWidth: number;
};

const MOBILE_MAX = 640;
const DESKTOP_MIN = 969;

const emptyGeometry: TraceGeometry = {
  width: 0,
  height: 0,
  isMobile: true,
  xLeft: 0,
  xRight: 0,
  xCenter: 0,
  viaY: 0,
  upperJog: 0,
  lowerJog: 0,
  stemPath: "",
  branchAPath: "",
  branchBPath: "",
  pulsePath: "",
  strokeWidth: 2,
};

/** Distance from the top of the document, without touching getBoundingClientRect. */
function getDocumentTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop || 0;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

function buildGeometry(viaEl: HTMLElement | null): TraceGeometry {
  const w = window.innerWidth;
  const pageH = document.body.scrollHeight;
  const isMobile = w <= MOBILE_MAX;

  // Fork point comes from the real DOM position of the ViaTransition element.
  const viaY = viaEl
    ? Math.round(getDocumentTop(viaEl) + viaEl.offsetHeight / 2)
    : Math.round(pageH * 0.35);

  const xLeft = Math.max(32, Math.round(w * 0.04));
  const xRight = Math.min(w - 32, Math.round(w * 0.94));
  const xCenter = Math.round(w * 0.5);

  let stemPath: string;
  let branchAPath: string;
  let branchBPath: string;
  let upperJog: number;
  let lowerJog: number;

  if (isMobile) {
    upperJog = Math.max(viaY - 120, 0);
    lowerJog = Math.max(pageH - 140, viaY + 120);

    stemPath = [`M ${xCenter} 0`, `L ${xCenter} ${upperJog}`, `L ${xCenter} ${viaY}`].join(" ");
    branchAPath = [
      `M ${xCenter} ${viaY}`,
      `L ${xLeft} ${viaY}`,
      `L ${xLeft} ${Math.max(viaY - 120, 0)}`,
    ].join(" ");
    branchBPath = [
      `M ${xCenter} ${viaY}`,
      `L ${xRight} ${viaY}`,
      `L ${xRight} ${lowerJog}`,
      `L ${xCenter} ${lowerJog}`,
      `L ${xCenter} ${pageH}`,
    ].join(" ");
  } else {
    upperJog = Math.max(viaY - 260, 180);
    lowerJog = Math.min(viaY + 220, pageH - 220);
    const exitBranch = Math.max(pageH - 180, lowerJog + 120);

    stemPath = [
      `M ${xLeft} 0`,
      `L ${xLeft} ${upperJog}`,
      `L ${xCenter} ${upperJog}`,
      `L ${xCenter} ${viaY}`,
    ].join(" ");

    branchAPath = [
      `M ${xCenter} ${viaY}`,
      `L ${xLeft} ${viaY}`,
      `L ${xLeft} ${lowerJog}`,
      `L ${xCenter} ${lowerJog}`,
    ].join(" ");

    branchBPath = [
      `M ${xCenter} ${viaY}`,
      `L ${xRight} ${viaY}`,
      `L ${xRight} ${exitBranch}`,
      `L ${xCenter} ${exitBranch}`,
      `L ${xCenter} ${pageH}`,
    ].join(" ");
  }

  // The greet dot must reach the very end of the page, so it rides
  // stem -> branchB as one continuous polyline.
  const pulsePath = `${stemPath} ${branchBPath.replace(/^M/, "L")}`;

  return {
    width: w,
    height: pageH,
    isMobile,
    xLeft,
    xRight,
    xCenter,
    viaY,
    upperJog,
    lowerJog,
    stemPath,
    branchAPath,
    branchBPath,
    pulsePath,
    strokeWidth: isMobile ? 2 : 3,
  };
}

type Options = {
  /** Enable the scroll parallax on sections/cards. Off for secondary pages. */
  parallax?: boolean;
};

/**
 * Owns the PCB trace geometry, the traveling "greet dot" pulse and the
 * non-compounding scroll parallax.
 */
export function usePcbTrace({ parallax = true }: Options = {}) {
  const [geometry, setGeometry] = useState<TraceGeometry>(emptyGeometry);
  const viaRef = useRef<HTMLDivElement | null>(null);
  const pulsePathRef = useRef<SVGPathElement | null>(null);
  const pulseRef = useRef<SVGCircleElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const offsetsRef = useRef(new WeakMap<HTMLElement, number>());
  const frameRef = useRef<number | null>(null);

  const parallaxTargets = useCallback(
    () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-parallax-section], [data-parallax-block], [data-parallax-card]",
        ),
      ),
    [],
  );

  /** Reset transforms and store the untransformed document offsets once. */
  const captureOriginalOffsets = useCallback(() => {
    const map = new WeakMap<HTMLElement, number>();
    parallaxTargets().forEach((el) => {
      el.style.transform = "none";
      map.set(el, getDocumentTop(el));
    });
    offsetsRef.current = map;
  }, [parallaxTargets]);

  const update = useCallback(() => {
    const scrollY = window.scrollY;
    const isDesktop = window.innerWidth >= DESKTOP_MIN;
    const pulse = pulseRef.current;
    const path = pulsePathRef.current;

    if (gridRef.current) {
      gridRef.current.style.transform = isDesktop
        ? `translateY(${scrollY * -0.3}px)`
        : "none";
    }

    if (path && pulse) {
      if (isDesktop) {
        const pageH = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(1, scrollY / pageH);
        const len = path.getTotalLength();
        const pt = path.getPointAtLength(progress * len);
        pulse.setAttribute("cx", String(pt.x));
        pulse.setAttribute("cy", String(pt.y));
        pulse.setAttribute("r", "6");
      } else {
        pulse.setAttribute("r", "0");
      }
    }

    if (!parallax) return;

    parallaxTargets().forEach((el, index) => {
      if (!isDesktop) {
        el.style.transform = "none";
        return;
      }
      const originalTop = offsetsRef.current.get(el) ?? 0;
      const factor = el.hasAttribute("data-parallax-section")
        ? 0.08
        : el.hasAttribute("data-parallax-block")
          ? 0.04
          : 0.03;
      const offset = (window.innerHeight * 0.5 - (originalTop - scrollY)) * factor;
      if (el.hasAttribute("data-parallax-card")) {
        const scale = 1 + Math.sin(scrollY * 0.001 + index) * 0.01;
        el.style.transform = `translateY(${offset}px) scale(${scale})`;
      } else {
        el.style.transform = `translateY(${offset}px)`;
      }
      el.style.willChange = "transform";
    });
  }, [parallax, parallaxTargets]);

  const requestUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      update();
    });
  }, [update]);

  const rebuild = useCallback(() => {
    captureOriginalOffsets();
    setGeometry(buildGeometry(viaRef.current));
    requestUpdate();
  }, [captureOriginalOffsets, requestUpdate]);

  useEffect(() => {
    rebuild();
    const t = window.setTimeout(rebuild, 400); // after fonts/layout settle

    window.addEventListener("resize", rebuild);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    const ro = new ResizeObserver(rebuild);
    ro.observe(document.body);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("scroll", requestUpdate);
      ro.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [rebuild, requestUpdate]);

  return { geometry, viaRef, pulsePathRef, pulseRef, gridRef, rebuild };
}
