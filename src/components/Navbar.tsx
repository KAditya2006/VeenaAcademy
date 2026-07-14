import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Home", "Courses", "Results", "Faculty", "Gallery", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-normal ${scrolled ? "bg-glass shadow-level2 shadow-blue-950/5 backdrop-blur-xl" : "bg-glass backdrop-blur"}`}>
      <nav className="container-premium flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-3" aria-label="Veena Academy home">
          <span className="grid h-11 w-11 place-items-center rounded-tokenXl bg-primary text-lg font-black text-text-inverse shadow-level3">V</span>
          <span className="text-xl font-black text-primary">Veena Academy</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-bold text-text-secondary transition hover:text-accent">
              {link}
            </a>
          ))}
        </div>

        <a href="#contact" className="button-primary hidden lg:inline-flex">Book Free Demo</a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-tokenPill border border-border bg-card text-primary lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container-premium flex flex-col gap-2 py-5">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="rounded-tokenXl px-4 py-3 text-sm font-bold text-text-secondary hover:bg-primary-light"
              >
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="button-primary mt-2">Book Free Demo</a>
          </div>
        </div>
      )}
    </header>
  );
}


