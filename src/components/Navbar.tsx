import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActiveHref = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-6 md:px-10">
      <div className="mx-auto max-w-5xl rounded-full border border-black/5 bg-white/90 backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-300">
        <div className="flex h-14 items-center justify-between pl-5 pr-3 md:pl-6 md:pr-5">
          <a href="/" className="flex items-center shrink-0">
            <img src={logo} alt="Portal Juice" className="h-11 md:h-12 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-12 ml-auto">
            {links.map((l) => {
              const isActive = isActiveHref(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-[14px] font-medium tracking-wide transition-all duration-300 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:bg-brand after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-brand after:scale-x-100 after:shadow-[0_0_10px_rgba(34,197,94,0.55)]"
                      : "text-neutral-800 hover:text-brand after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-neutral-800 hover:bg-black/5 transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-black/5 px-6 py-3">
            <nav className="flex flex-col">
              {links.map((l) => {
                const isActive = isActiveHref(l.href);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`py-3 text-base font-medium transition-colors duration-300 ${
                      isActive ? "text-brand" : "text-neutral-800 hover:text-brand"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}