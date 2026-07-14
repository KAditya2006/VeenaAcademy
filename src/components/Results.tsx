import { Trophy } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { resultCounters as counters, results } from "../data/results";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => spring.on("change", (latest) => setDisplay(Math.round(latest))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Results() {
  return (
    <section id="results" className="bg-card py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Results"
          title="Performance that builds parent confidence"
          description="A result-oriented academic environment with measured progress, test analytics and regular mentoring for each student."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {counters.map((counter) => (
            <div key={counter.label} className="premium-card p-7 text-center">
              <p className="font-display text-5xl font-normal text-primary sm:text-6xl">
                <Counter value={counter.value} suffix={counter.suffix} />
              </p>
              <p className="mt-3 font-bold text-text-secondary">{counter.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((student, index) => (
            <motion.article
              key={student.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.55 }}
              className="premium-card overflow-hidden"
            >
              <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-primary to-primary-hover text-text-inverse">
                <div className="grid h-24 w-24 place-items-center rounded-tokenPill bg-card/15 text-3xl font-black backdrop-blur">{student.initials}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-accent">
                  <Trophy size={18} />
                  <span className="text-sm font-black">{student.achievement}</span>
                </div>
                <h3 className="mt-3 text-xl font-black text-text-primary">{student.name}</h3>
                <p className="mt-2 text-2xl font-black text-primary">{student.score}</p>
                <p className="mt-2 text-sm font-semibold text-text-muted">{student.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}




