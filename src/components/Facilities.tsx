import { Bus, HeartHandshake, Library, MonitorPlay, Shield, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const facilities = [
  { icon: Library, title: "Library", description: "Quiet reading spaces and reference materials for focused study hours." },
  { icon: Bus, title: "Transport", description: "Route-based transport support for convenient academy access." },
  { icon: MonitorPlay, title: "Smart Classes", description: "Digital learning aids for visual understanding and better retention." },
  { icon: ClipboardList, title: "Test Series", description: "Regular tests with performance reviews and exam-readiness tracking." },
  { icon: HeartHandshake, title: "Counselling", description: "Academic and career guidance for students and parents." },
  { icon: Shield, title: "Safe Learning Environment", description: "Disciplined, respectful and student-friendly campus culture." },
];

export default function Facilities() {
  return (
    <section className="bg-card py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Facilities"
          title="A focused campus experience for serious learners"
          description="Every facility is designed to reduce friction for students and create a dependable academic routine for families."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
              className="premium-card p-7"
            >
              <facility.icon className="text-accent" size={32} />
              <h3 className="mt-6 text-xl font-black text-primary">{facility.title}</h3>
              <p className="mt-3 leading-7 text-text-secondary">{facility.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


