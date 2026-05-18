import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://wa.me/", label: "WhatsApp", Icon: MessageCircle },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-neutral-600 sm:flex-row">
        <p className="tracking-wide">© 2026 Portal Juice — Gateway to Health</p>
        <nav className="flex items-center gap-5">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-brand hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.45)]"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}