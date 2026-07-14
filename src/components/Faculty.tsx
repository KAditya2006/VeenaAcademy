import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { faculty } from "../data/faculty";

export default function Faculty() {
  return (
    <section id="faculty" className="bg-primary-light/60 py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Faculty"
          title="Mentors who teach with clarity and care"
          description="Experienced subject experts guide students through concepts, practice, exams and decisions with a balanced academic approach."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((teacher, index) => (
            <motion.article
              key={teacher.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
              className="premium-card overflow-hidden p-4"
            >
              <div className="grid aspect-square place-items-center rounded-tokenXl bg-gradient-to-br from-background to-primary-light">
                <div className="grid h-28 w-28 place-items-center rounded-tokenPill bg-primary text-3xl font-black text-text-inverse shadow-level3">{teacher.initials}</div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-black text-text-primary">{teacher.name}</h3>
                <p className="mt-1 font-bold text-accent">{teacher.subject}</p>
                <p className="mt-4 text-sm font-semibold text-text-secondary">{teacher.experience} experience</p>
                <p className="mt-2 text-sm text-text-muted">{teacher.qualification}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


