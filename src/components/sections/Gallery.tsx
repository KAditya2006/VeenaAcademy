import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Modal } from "../common/Modal";
import type { GalleryItem } from "../../types";
import { cn } from "../../lib/cn";
import { getPublicGallery, staticData, staticFallbackEnabled } from "../../lib/publicApi";

const categories = ["All", "Classroom", "Events", "Students", "Seminars"] as const;

export function Gallery() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ["public-gallery"], queryFn: ({ signal }) => getPublicGallery(signal) });
  const source = data ?? (staticFallbackEnabled ? staticData.gallery : []);
  const filtered = useMemo(() => source.filter((item) => category === "All" || item.category === category), [category, source]);
  return <section id="gallery" className="bg-gradient-to-b from-primary-light/50 to-background section-pad"><Container><SectionHeader badge="Gallery" title="A glimpse of learning at Veena Academy" description="Classrooms, student activities, seminars and academic moments from a disciplined, encouraging learning environment." /><div className="mt-10 flex flex-wrap justify-center gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={cn("rounded-tokenPill border px-4 py-2 text-sm font-bold transition", category === item ? "border-primary bg-primary text-text-inverse" : "border-border bg-card text-primary hover:bg-primary-light")}>{item}</button>)}</div>{isLoading && <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-token2xl bg-card" />)}</div>}{isError && !staticFallbackEnabled && <div className="premium-card mt-10 p-8 text-center"><p className="font-bold text-error">Gallery is temporarily unavailable.</p><button type="button" onClick={() => void refetch()} className="button-secondary mt-4">Retry</button></div>}<div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">{filtered.map((item) => <motion.button type="button" key={item.id} onClick={() => setSelected(item)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn("group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-token2xl bg-gradient-to-br text-left shadow-level3", item.tone, item.height)}>{item.imageUrl ? <img src={item.imageUrl} alt={item.altText || item.title} className="h-full min-h-[18rem] w-full object-cover transition duration-slow group-hover:scale-105" loading="lazy" /> : <div className="flex h-full items-end p-6 transition duration-slow group-hover:scale-105"><div className="rounded-tokenXl bg-glass px-5 py-4 shadow-level1 backdrop-blur"><p className="text-lg font-black text-primary">{item.title}</p><p className="mt-1 text-sm font-semibold text-text-muted">{item.category}</p></div></div>}<div className="absolute bottom-5 left-5 rounded-tokenXl bg-glass px-5 py-4 shadow-level1 backdrop-blur"><p className="text-lg font-black text-primary">{item.title}</p><p className="mt-1 text-sm font-semibold text-text-muted">{item.category}</p></div></motion.button>)}</div><Modal open={Boolean(selected)} title={selected?.title ?? "Gallery image"} onClose={() => setSelected(null)}>{selected && <div className={cn("grid min-h-96 place-items-center overflow-hidden rounded-tokenXl bg-gradient-to-br text-center", selected.tone)}><button type="button" onClick={() => setSelected(null)} className="absolute right-8 top-8 sr-only"><X /></button>{selected.imageUrl ? <img src={selected.imageUrl} alt={selected.altText || selected.title} className="max-h-[70vh] w-full object-contain" /> : <div className="p-8"><p className="font-display text-5xl text-primary">{selected.title}</p><p className="mt-3 font-bold text-text-secondary">Professional image placeholder for {selected.category.toLowerCase()} photography.</p></div>}</div>}</Modal></Container></section>;
}

