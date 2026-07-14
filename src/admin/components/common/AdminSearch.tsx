import { Search } from "lucide-react";

export function AdminSearch({ value, onChange, placeholder = "Search" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="relative block w-full max-w-sm"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} /><span className="sr-only">{placeholder}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="form-field h-11 w-full rounded-tokenPill pl-11" placeholder={placeholder} /></label>;
}

