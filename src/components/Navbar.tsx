import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/portal-juice-logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/juices", label: "Juices" },
  { href: "/contact", label: "Contact Info" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b transition-shadow duration-300 ${
        scrolled ? "border-border shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]" : "border-border/40"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="Portal Juice" className="h-12 w-auto" />
          <span className="hidden sm:inline text-lg font-serif font-semibold tracking-tight text-foreground">
            Portal Juice
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const isActive = typeof window !== "undefined" && window.location.pathname === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`text-[15px] font-medium transition-colors hover:text-brand ${
                  isActive ? "text-brand" : "text-foreground/70"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground/80 hover:text-brand"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}