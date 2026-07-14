import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { AnimatedCounter } from "../common/AnimatedCounter";
import { stats } from "../../data/stats";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/animations";

export function TrustStats() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {stats.map((item) => <motion.article key={item.id} variants={fadeUp} className="premium-card flex min-h-44 flex-col p-5 hover:-translate-y-1"><item.icon className="text-accent" size={28} /><p className="mt-7 font-display text-3xl text-primary"><AnimatedCounter value={item.value} suffix={item.suffix} /></p><h3 className="mt-1 text-base font-black text-primary">{item.label}</h3><p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p></motion.article>)}
        </motion.div>
      </Container>
    </section>
  );
}
