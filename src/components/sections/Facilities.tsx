import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { facilities } from "../../data/facilities";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/animations";

export function Facilities() {
  return <section className="bg-card section-pad"><Container><SectionHeader badge="Facilities" title="A focused campus experience for serious learners" description="Every facility is designed to reduce friction for students and create a dependable academic routine for families." /><motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{facilities.map((facility) => <motion.div key={facility.id} variants={fadeUp} className="premium-card p-7"><facility.icon className="text-accent" size={32} /><h3 className="mt-6 text-xl font-black text-primary">{facility.title}</h3><p className="mt-3 leading-7 text-text-secondary">{facility.description}</p></motion.div>)}</motion.div></Container></section>;
}
