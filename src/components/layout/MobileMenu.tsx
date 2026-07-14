import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { AnchorButton, Button } from "../common/Button";
import { navigation } from "../../data/navigation";
import { useScrollLock } from "../../hooks/useScrollLock";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useScrollLock(open);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-overlay lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-card p-5 shadow-level4">
        <div className="flex items-center justify-between">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-tokenXl bg-primary text-lg font-black text-text-inverse shadow-level3">V</span>
            <span className="text-xl font-black text-primary">Veena Academy</span>
          </NavLink>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label="Close navigation"><X size={22} /></Button>
        </div>
        <nav className="mt-8 grid gap-2" aria-label="Mobile primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.href} to={item.href} onClick={onClose} className={({ isActive }) => `rounded-tokenXl px-4 py-3 text-base font-bold transition ${isActive ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-primary-light"}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <AnchorButton href="/admission" className="mt-8 w-full" onClick={onClose}>Book Free Demo</AnchorButton>
      </div>
    </div>
  );
}
