import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import logo from "@/assets/portal-juice-logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/juices", label: "Juices" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl backdrop-saturate-150 border-b transition-all duration-500 ${
        scrolled
          ? "bg-background/60 border-white/10 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.25)]"
          : "bg-white/5 border-white/10"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="/" className="flex items-center">
          <img src={logo} alt="Portal Juice" className="h-12 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const isActive =
              l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-[15px] font-medium transition-all duration-500 ease-out hover:text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:bg-brand after:transition-transform after:duration-500 ${
                  isActive
                    ? "text-white tracking-wide after:scale-x-100 after:shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                    : "text-white/75 after:scale-x-0 hover:after:scale-x-100 hover:after:bg-white/70"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-background/80 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-4">
            {links.map((l) => {
              const isActive =
                l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`py-3 text-base font-medium transition-colors ${
                    isActive ? "text-brand" : "text-foreground hover:text-brand"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}