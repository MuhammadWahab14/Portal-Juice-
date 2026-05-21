import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://wa.me/", label: "WhatsApp", Icon: MessageCircle },
];

type FooterProps = {
  /** Kept for API compatibility; footer is solid on every page. */
  variant?: "transparent" | "light";
};

export function Footer({ variant: _variant }: FooterProps = {}) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 h-[var(--footer-h)] border-t border-black/5 bg-white">
      <div className="flex h-full w-full items-center justify-between px-4 sm:px-6">
        <p className="text-[10px] font-light uppercase tracking-[0.25em] text-foreground/65 sm:text-[11px]">
          © 2026 Portal Juice — Gateway to Health
        </p>
        <nav className="flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1.5 shadow-[0_4px_24px_-14px_rgba(0,0,0,0.18)]">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground/70 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-foreground/5 hover:text-foreground"
            >
              <Icon className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}