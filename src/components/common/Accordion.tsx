import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import type { FAQItem } from "../../types";

type AccordionProps = { items: FAQItem[]; defaultOpenId?: string };

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [active, setActive] = useState(defaultOpenId ?? items[0]?.id);
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const open = active === item.id;
        return (
          <article key={item.id} className="premium-card overflow-hidden">
            <button type="button" onClick={() => setActive(open ? "" : item.id)} aria-expanded={open} className="flex min-h-14 w-full items-center justify-between gap-4 p-6 text-left">
              <span className="text-lg font-black text-primary">{item.question}</span>
              <ChevronDown className={cn("shrink-0 text-accent transition", open && "rotate-180")} size={22} />
            </button>
            {open && <div className="px-6 pb-6 leading-7 text-text-secondary">{item.answer}</div>}
          </article>
        );
      })}
    </div>
  );
}
