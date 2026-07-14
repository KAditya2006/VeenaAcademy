import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AnchorButton, Button } from "../common/Button";
import { Container } from "../common/Container";
import { MobileMenu } from "./MobileMenu";
import { navigation } from "../../data/navigation";
import { cn } from "../../lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-normal", scrolled ? "bg-glass shadow-level2 backdrop-blur-xl" : "bg-glass backdrop-blur")}>
      <Container>
        <nav className="flex h-20 items-center justify-between" aria-label="Primary navigation">
          <NavLink to="/" className="flex items-center gap-3" aria-label="Veena Academy home">
            <span className="grid h-11 w-11 place-items-center rounded-tokenXl bg-primary text-lg font-black text-text-inverse shadow-level3">V</span>
            <span className="text-xl font-black text-primary">Veena Academy</span>
          </NavLink>
          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <NavLink key={item.href} to={item.href} className={({ isActive }) => cn("text-sm font-bold transition hover:text-accent", isActive ? "text-primary" : "text-text-secondary")}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <AnchorButton href="/admission" className="hidden lg:inline-flex">Book Free Demo</AnchorButton>
          <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(true)} className="grid h-11 w-11 px-0 lg:hidden" aria-label="Open navigation" aria-expanded={open}>
            <Menu size={22} />
          </Button>
        </nav>
      </Container>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
