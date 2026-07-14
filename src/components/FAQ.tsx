import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { faqs } from "../data/faqs";

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-primary-light/50 py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="FAQ"
          title="Answers before you visit"
          description="Quick information about admission, demo classes, available courses, tests and academy facilities."
        />
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const open = active === index;
            return (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card overflow-hidden">
                <button type="button" onClick={() => setActive(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                  <span className="text-lg font-black text-primary">{faq.question}</span>
                  <ChevronDown className={`shrink-0 text-accent transition ${open ? "rotate-180" : ""}`} size={22} />
                </button>
                {open && <div className="px-6 pb-6 leading-7 text-text-secondary">{faq.answer}</div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


