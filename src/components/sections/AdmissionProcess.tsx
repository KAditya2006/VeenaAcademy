import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { AnchorButton } from "../common/Button";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/animations";

const steps = ["Fill Enquiry Form", "Counselling Call", "Attend Demo Class", "Confirm Admission"];

export function AdmissionProcess() {
  return <section className="bg-primary section-pad text-text-inverse"><Container><SectionHeader tone="dark" badge="Admission Process" title="A clear path from enquiry to the right batch" description="Our counselling team helps each family understand course fit, batch timing and learning plan before admission." /><motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-14 grid gap-5 md:grid-cols-4">{steps.map((step, index) => <motion.div key={step} variants={fadeUp} className="relative rounded-token2xl border border-glass-border bg-card/10 p-6 backdrop-blur"><div className="grid h-12 w-12 place-items-center rounded-tokenPill bg-accent text-text-inverse"><CheckCircle2 size={24} /></div><p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-accent-light">Step {index + 1}</p><h3 className="mt-2 text-xl font-black">{step}</h3></motion.div>)}</motion.div><div className="mt-10 text-center"><AnchorButton href="/admission">Start Admission Enquiry</AnchorButton></div></Container></section>;
}
