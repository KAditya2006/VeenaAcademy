import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { gallery } from "../data/gallery";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-gradient-to-b from-primary-light/50 to-background py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Gallery"
          title="A glimpse of learning at Veena Academy"
          description="Classrooms, student activities, seminars and academic moments from a disciplined, encouraging learning environment."
        />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
              className={`group mb-5 break-inside-avoid overflow-hidden rounded-token2xl bg-gradient-to-br ${item.tone} ${item.height} shadow-level3`}
            >
              <div className="flex h-full items-end p-6 transition duration-500 group-hover:scale-105">
                <div className="rounded-tokenXl bg-glass px-5 py-4 shadow-level1 backdrop-blur">
                  <p className="text-lg font-black text-primary">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


