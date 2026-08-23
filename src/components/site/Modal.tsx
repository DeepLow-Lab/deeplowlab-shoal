import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/** Accessible, escape-dismissible modal used by every inquiry/placeholder dialog. */
export function Modal({
  open,
  onClose,
  title,
  accent = "trace",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  accent?: "trace" | "surface";
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-void/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-[480px] border bg-panel p-6 outline-none md:p-8"
            style={{ borderColor: accent === "trace" ? "var(--trace)" : "var(--surface)" }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2
                className="dot text-[14px] tracking-[1px] md:text-[16px]"
                style={{ color: accent === "trace" ? "var(--trace)" : "var(--surface)" }}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="text-dim transition-colors hover:text-signal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
