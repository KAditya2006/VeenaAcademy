import { Brain, BookMarked, CalendarCheck, GraduationCap, Library, MessageSquareText, MonitorCheck, Route } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const features = [
  { icon: GraduationCap, title: "Experienced Teachers" },
  { icon: CalendarCheck, title: "Weekly Test Series" },
  { icon: MessageSquareText, title: "Doubt Clearing Sessions" },
  { icon: MonitorCheck, title: "Smart Classroom" },
  { icon: BookMarked, title: "Study Materials" },
  { icon: Brain, title: "Career Guidance" },
  { icon: Library, title: "Library Facility" },
  { icon: Route, title: "Transport Facility" },
];

export default function WhyChoose() {
  return (
    <section className="bg-gradient-to-b from-primary-light/60 to-background py-20 sm:py-28">
      <div className="container-premium grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeader
          align="left"
          eyebrow="Why Choose Us"
          title="Premium academic care with disciplined execution"
          description="Parents see transparency. Students feel supported. Every batch is guided by a system of teaching, testing, doubt resolution and mentoring."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
              className="premium-card flex items-center gap-4 p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-tokenXl bg-card text-accent shadow-level1">
                <feature.icon size={24} />
              </span>
              <h3 className="text-lg font-black text-primary">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


