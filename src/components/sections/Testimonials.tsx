import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { testimonials } from "../../data/testimonials";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/animations";

export function Testimonials() {
  return <section className="bg-card section-pad"><Container><SectionHeader badge="Testimonials" title="Trusted by students and parents" description="Families choose Veena Academy for clear teaching, consistent testing and a mentoring culture that takes student progress seriously." /><motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-14 grid gap-5 lg:grid-cols-3">{testimonials.map((item) => <motion.article key={item.id} variants={fadeUp} className="premium-card p-7"><div className="flex items-center justify-between"><Quote className="text-accent" size={32} /><span className="rounded-tokenPill bg-primary-light px-3 py-1 text-xs font-black text-primary">{item.type}</span></div><div className="mt-5 flex gap-1 text-accent">{Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div><p className="mt-6 text-lg leading-8 text-text-secondary">&quot;{item.quote}&quot;</p><div className="mt-8 border-t border-divider pt-5"><h3 className="font-black text-primary">{item.name}</h3><p className="mt-1 text-sm font-semibold text-text-muted">{item.role}</p></div></motion.article>)}</motion.div></Container></section>;
}
