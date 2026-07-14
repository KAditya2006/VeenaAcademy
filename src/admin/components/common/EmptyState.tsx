import { Inbox } from "lucide-react";

export function EmptyState({ title = "Nothing here yet", description = "Create a new record or adjust filters to see results." }: { title?: string; description?: string }) {
  return <div className="grid min-h-52 place-items-center rounded-token2xl border border-dashed border-border bg-surface/60 p-8 text-center"><div><Inbox className="mx-auto text-text-muted" size={34} /><h3 className="mt-4 text-lg font-black text-primary">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-text-muted">{description}</p></div></div>;
}

