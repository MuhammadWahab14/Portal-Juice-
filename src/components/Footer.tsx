import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://wa.me/", label: "WhatsApp", Icon: MessageCircle },
];

export function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 text-xs text-white/80 sm:flex-row sm:px-8 sm:py-4 sm:text-sm">
        <p className="tracking-[0.2em] uppercase text-white/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          © 2026 Portal Juice — Gateway to Health
        </p>
        <nav className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)]">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.55)]"
            >
              <Icon className="h-[16px] w-[16px]" strokeWidth={1.75} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}