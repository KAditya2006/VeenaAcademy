import { Brain, BookMarked, CalendarCheck, GraduationCap, Library, MessageSquareText, MonitorCheck, Route } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/animations";

const features = [
  { icon: GraduationCap, title: "Experienced Teachers" }, { icon: CalendarCheck, title: "Weekly Test Series" }, { icon: MessageSquareText, title: "Doubt Clearing Sessions" }, { icon: MonitorCheck, title: "Smart Classroom" }, { icon: BookMarked, title: "Study Materials" }, { icon: Brain, title: "Career Guidance" }, { icon: Library, title: "Library Facility" }, { icon: Route, title: "Transport Facility" },
];

export function WhyChoose() {
  return <section className="bg-gradient-secondary section-pad"><Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><SectionHeader align="left" badge="Why Choose Us" title="Premium academic care with disciplined execution" description="Parents see transparency. Students feel supported. Every batch is guided by a system of teaching, testing, doubt resolution and mentoring." /><motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-4 sm:grid-cols-2">{features.map((feature) => <motion.div key={feature.title} variants={fadeUp} className="premium-card flex items-center gap-4 p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-tokenXl bg-card text-accent shadow-level1"><feature.icon size={24} /></span><h3 className="text-lg font-black text-primary">{feature.title}</h3></motion.div>)}</motion.div></Container></section>;
}
