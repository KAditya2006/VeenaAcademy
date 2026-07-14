import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-card py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by students and parents"
          description="Families choose Veena Academy for clear teaching, consistent testing and a mentoring culture that takes student progress seriously."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.55 }}
              className="premium-card p-7"
            >
              <Quote className="text-accent" size={32} />
              <p className="mt-6 text-lg leading-8 text-text-secondary">"{item.quote}"</p>
              <div className="mt-8 border-t border-border pt-5">
                <h3 className="font-black text-primary">{item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-text-muted">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


