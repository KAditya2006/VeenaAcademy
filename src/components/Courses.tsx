import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { courses } from "../data/courses";

export default function Courses() {
  return (
    <section id="courses" className="bg-card py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Courses"
          title="Programs designed for every academic milestone"
          description="From foundation batches to competitive exam preparation, every course is built around clarity, practice, mentoring and measurable progress."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.article
              key={course.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.04, duration: 0.55 }}
              className="premium-card group flex min-h-72 flex-col p-7 hover:-translate-y-2 hover:border-accent/30"
            >
              <div className="grid h-14 w-14 place-items-center rounded-tokenXl bg-primary-light text-primary transition group-hover:bg-accent group-hover:text-text-inverse">
                <course.icon size={28} />
              </div>
              <h3 className="mt-7 text-xl font-black text-text-primary">{course.title}</h3>
              <p className="mt-4 flex-1 leading-7 text-text-secondary">{course.description}</p>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-primary transition group-hover:text-accent">
                Know More <ArrowUpRight size={17} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


