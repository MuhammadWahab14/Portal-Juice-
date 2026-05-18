import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://wa.me/", label: "WhatsApp", Icon: MessageCircle },
];

export function SocialDock() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.15)] text-neutral-700 transition-all duration-300 hover:scale-110 hover:text-brand hover:shadow-[0_0_18px_rgba(34,197,94,0.45)]"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
