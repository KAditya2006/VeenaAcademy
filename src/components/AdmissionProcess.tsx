import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const steps = ["Fill Form", "Counselling", "Demo Class", "Admission Confirm"];

export default function AdmissionProcess() {
  return (
    <section className="bg-primary py-20 text-text-inverse sm:py-28">
      <div className="container-premium">
        <SectionHeader
          tone="dark"
          eyebrow="Admission Process"
          title="A clear path from enquiry to the right batch"
          description="Our counselling team helps each family understand course fit, batch timing and learning plan before admission."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="relative rounded-token2xl border border-glass-border bg-card/10 p-6 backdrop-blur"
            >
              <div className="grid h-12 w-12 place-items-center rounded-tokenPill bg-accent text-text-inverse">
                <CheckCircle2 size={24} />
              </div>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-accent-light">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-black">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


