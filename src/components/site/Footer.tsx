import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/DeepLow-Lab", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "X", href: "https://x.com", Icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Email", href: "mailto:deeplowlab@gmail.com", Icon: Mail },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-[2] border-t border-line px-4 pb-8 pt-10 font-mono text-[10px] text-dim sm:px-6 md:px-12 md:pb-10 md:pt-[60px] md:text-[12px]"
    >
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <div className="dot text-[14px] tracking-[1px] text-trace">
            DEEPLOW<span className="text-dim">_LAB</span>
          </div>
          <p className="mt-4 max-w-[280px] font-sans text-[13px] font-light leading-[1.7] text-dim">
            Building from the silicon up. Embedded hardware, perception and edge AI — plus web
            work through Shoal.
          </p>
        </div>

        <div>
          <div className="mb-4 tracking-[2px] text-dim">/ NAVIGATE</div>
          <ul className="space-y-2">
            <li>
              <a href="#work" className="transition-colors hover:text-signal">
                CORE
              </a>
            </li>
            <li>
              <a href="#shoal" className="transition-colors hover:text-signal">
                SHOAL
              </a>
            </li>
            <li>
              <Link to="/shoal" className="transition-colors hover:text-surface">
                SHOAL / PRICING
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 tracking-[2px] text-dim">/ SIGNAL OUT</div>
          <div className="flex gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center border border-line text-dim transition-colors hover:border-trace hover:text-trace"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
          <div className="mt-5 tracking-[1px]">PORT-AU-PRINCE, HT</div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
        <div>© 2026 DEEPLOW LAB — PORT-AU-PRINCE, HT</div>
        <div>CORE + SHOAL</div>
      </div>
    </footer>
  );
}
