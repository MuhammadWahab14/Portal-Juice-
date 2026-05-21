import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://wa.me/", label: "WhatsApp", Icon: MessageCircle },
];

type FooterProps = {
  /** "transparent" for hero overlays (home), "light" for light page backgrounds */
  variant?: "transparent" | "light";
};

export function Footer({ variant = "transparent" }: FooterProps) {
  const isLight = variant === "light";
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
      {isLight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/85 via-white/55 to-transparent backdrop-blur-[2px]"
        />
      )}
      <div className="pointer-events-auto relative flex w-full flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6 sm:py-4">
        <p
          className={cn(
            "text-[10px] font-light tracking-[0.25em] uppercase sm:text-[11px]",
            isLight
              ? "text-foreground/65"
              : "text-white/60 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]",
          )}
        >
          © 2026 Portal Juice — Gateway to Health
        </p>
        <nav
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md backdrop-saturate-150",
            isLight
              ? "border-foreground/10 bg-white/60 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.15)]"
              : "border-white/15 bg-white/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)]",
          )}
        >
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "group inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.55)]",
                isLight
                  ? "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-[16px] w-[16px]" strokeWidth={1.75} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}