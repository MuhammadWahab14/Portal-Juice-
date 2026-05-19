import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import logo from "@/assets/portal-juice-logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/juices", label: "Juices" },
  { href: "/contact", label: "Contact Info" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActiveHref = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
      <div className="w-full max-w-[100vw] overflow-hidden">
        <div className="flex h-20 md:h-28 items-center justify-between pl-4 pr-4 sm:pl-8 sm:pr-8 md:pl-12 md:pr-12">
          <a href="/" className="flex items-center shrink-0">
            <img src={logo} alt="Portal Juice" className="h-16 sm:h-20 md:h-24 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-10 lg:gap-12 ml-auto">
            {links.map((l) => {
              const isActive = isActiveHref(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-[14px] font-medium tracking-wide transition-all duration-300 ease-out after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:bg-brand after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-brand after:scale-x-100"
                      : "text-neutral-700 hover:text-brand after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-800 hover:bg-black/5 transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-black/5 bg-white px-6 py-3">
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