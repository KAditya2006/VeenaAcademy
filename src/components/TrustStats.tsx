import { Bus, ClipboardCheck, Library, ShieldCheck, UserCheck, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: UsersRound, title: "5000+ Students Guided" },
  { icon: UserCheck, title: "Expert Faculty" },
  { icon: ClipboardCheck, title: "Regular Tests" },
  { icon: Library, title: "Library Facility" },
  { icon: Bus, title: "Transport Facility" },
  { icon: ShieldCheck, title: "Personal Mentorship" },
];

export default function TrustStats() {
  return (
    <section className="bg-primary-light/70 py-16 sm:py-20">
      <div className="container-premium">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
              className="premium-card flex min-h-40 flex-col justify-between p-5 hover:-translate-y-1"
            >
              <item.icon className="text-accent" size={28} />
              <h3 className="mt-8 text-lg font-black text-primary">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


