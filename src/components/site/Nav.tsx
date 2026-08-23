import { Link } from "@tanstack/react-router";

type NavLink = { label: string; href: string; to?: string };

export function Nav({
  revealed,
  links = [
    { label: "CORE", href: "#work" },
    { label: "SHOAL", href: "#shoal" },
    { label: "CONTACT", href: "#contact" },
  ],
  accent = "trace",
}: {
  revealed: boolean;
  links?: NavLink[];
  accent?: "trace" | "surface";
}) {
  return (
    <nav
      className="sticky top-0 z-10 flex items-center justify-between border-b border-line px-6 py-4 backdrop-blur-md transition-opacity duration-500 md:px-12 md:py-[22px]"
      style={{
        background: "rgba(11,13,15,0.85)",
        opacity: revealed ? 1 : 0,
      }}
    >
      <Link
        to="/"
        id="navWordmark"
        className="dot text-[12px] tracking-[1px] md:text-[15px]"
        style={{ color: accent === "trace" ? "var(--trace)" : "var(--surface)" }}
      >
        DEEPLOW<span className="text-dim">_LAB</span>
      </Link>
      <div className="hidden gap-8 font-mono text-[12px] tracking-[0.5px] text-dim md:flex">
        {links.map((l) =>
          l.to ? (
            <Link key={l.label} to={l.to} className="transition-colors hover:text-signal">
              {l.label}
            </Link>
          ) : (
            <a key={l.label} href={l.href} className="transition-colors hover:text-signal">
              {l.label}
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
