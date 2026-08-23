import { createContext, useContext, type ReactNode } from "react";
import { usePcbTrace } from "@/hooks/usePcbTrace";

type Ctx = ReturnType<typeof usePcbTrace>;

const PcbTraceContext = createContext<Ctx | null>(null);

export function PcbTraceProvider({
  children,
  parallax = true,
}: {
  children: ReactNode;
  parallax?: boolean;
}) {
  const value = usePcbTrace({ parallax });
  return <PcbTraceContext.Provider value={value}>{children}</PcbTraceContext.Provider>;
}

export function usePcbTraceContext() {
  const ctx = useContext(PcbTraceContext);
  if (!ctx) throw new Error("usePcbTraceContext must be used inside <PcbTraceProvider>");
  return ctx;
}
