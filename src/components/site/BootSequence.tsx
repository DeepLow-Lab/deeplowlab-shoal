import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WORD = "DEEPLOW_LAB";
const STEP = 0.06;
export const BOOT_SESSION_KEY = "dlb_boot_played";

/**
 * Letter-by-letter ignition of DEEPLOW_LAB, then a FLIP animation into the
 * nav wordmark position. Plays once per browser session.
 */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [flip, setFlip] = useState<{ x: number; y: number; scale: number } | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const typeTime = WORD.length * STEP * 1000 + 350;

    const t1 = window.setTimeout(() => {
      const logo = logoRef.current;
      const target = document.getElementById("navWordmark");
      if (logo && target) {
        const from = logo.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        setFlip({
          x: to.left + to.width / 2 - (from.left + from.width / 2),
          y: to.top + to.height / 2 - (from.top + from.height / 2),
          scale: to.width / from.width,
        });
      }
      window.setTimeout(() => {
        setHidden(true);
        sessionStorage.setItem(BOOT_SESSION_KEY, "1");
        onDone();
      }, 700);
    }, typeTime);

    return () => window.clearTimeout(t1);
  }, [onDone]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: hidden ? "none" : "auto", visibility: hidden ? "hidden" : "visible" }}
    >
      <motion.div
        ref={logoRef}
        className="dot relative flex"
        style={{ fontSize: "clamp(28px, 6vw, 52px)", letterSpacing: "2px" }}
        animate={flip ? { x: flip.x, y: flip.y, scale: flip.scale } : {}}
        transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
      >
        {[...WORD].map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="relative"
            style={{ color: ch === "_" || i >= 7 ? "var(--dim)" : "var(--trace)" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * STEP, duration: 0.35 }}
          >
            {ch}
            <motion.span
              className="absolute"
              style={{
                left: 2,
                right: 2,
                bottom: -8,
                height: 2,
                background: "var(--trace)",
                boxShadow: "0 0 6px var(--trace)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * STEP, duration: 0.25 }}
            />
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
