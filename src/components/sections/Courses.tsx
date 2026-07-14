import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import type { CourseCategory } from "../../types";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/animations";
import { cn } from "../../lib/cn";
import { getPublicCourses, staticData, staticFallbackEnabled } from "../../lib/publicApi";

const categories: Array<"All" | CourseCategory> = ["All", "School", "Competitive Exam", "Commerce", "Scholarship"];

export function Courses({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState<"All" | CourseCategory>("All");
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ["public-courses"], queryFn: ({ signal }) => getPublicCourses(signal) });
  const source = data ?? (staticFallbackEnabled ? staticData.courses : []);
  const filtered = useMemo(() => source.filter((course) => (category === "All" || course.category === category) && course.title.toLowerCase().includes(query.toLowerCase())), [category, query, source]);
  const visible = compact ? filtered.slice(0, 6) : filtered;

  return <section id="courses" className="bg-card section-pad"><Container><SectionHeader badge="Courses" title="Programs designed for every academic milestone" description="From foundation batches to competitive exam preparation, every course is built around clarity, practice, mentoring and measurable progress." /><div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={cn("rounded-tokenPill border px-4 py-2 text-sm font-bold transition", category === item ? "border-primary bg-primary text-text-inverse" : "border-border bg-card text-primary hover:bg-primary-light")}>{item}</button>)}</div><label className="relative block min-w-64"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} /><span className="sr-only">Search courses</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="form-field w-full pl-11" placeholder="Search courses" /></label></div>{isLoading && <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: compact ? 3 : 6 }).map((_, index) => <div key={index} className="h-80 animate-pulse rounded-token2xl bg-surface" />)}</div>}{isError && !staticFallbackEnabled && <div className="premium-card mt-10 p-8 text-center"><p className="font-bold text-error">Courses are temporarily unavailable.</p><button type="button" onClick={() => void refetch()} className="button-secondary mt-4">Retry</button></div>}{!isLoading && visible.length === 0 && !isError && <div className="premium-card mt-10 p-8 text-center text-text-muted">No published courses found.</div>}<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((course) => <motion.article key={course.id} variants={fadeUp} className="premium-card group flex min-h-80 flex-col p-7 hover:-translate-y-2 hover:border-accent/30"><div className="icon-tile h-14 w-14 group-hover:bg-accent group-hover:text-text-inverse"><course.icon size={28} /></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">{course.category}</p><h3 className="mt-2 text-xl font-black text-text-primary">{course.title}</h3><p className="mt-4 flex-1 leading-7 text-text-secondary">{course.description}</p><div className="mt-5 grid gap-2 text-sm text-text-muted"><span>Duration: {course.duration}</span><span>Eligibility: {course.eligibility}</span></div><Link to={`/courses/${course.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-primary transition group-hover:text-accent">{course.cta} <ArrowUpRight size={17} /></Link></motion.article>)}</motion.div></Container></section>;
}
