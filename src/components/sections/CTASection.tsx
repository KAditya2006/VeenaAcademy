import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { AnchorButton } from "../common/Button";
import { Container } from "../common/Container";
import { academyContact } from "../../lib/constants";

export function CTASection() {
  return <section className="bg-primary py-12 text-text-inverse sm:py-16"><Container><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-light">Admissions Open 2026-27</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-normal leading-tight sm:text-5xl">Start with a free counselling session and demo class.</h2></div><div className="flex flex-col gap-3 sm:flex-row"><AnchorButton href="/admission" rightIcon={<ArrowRight size={18} />}>Book Free Demo</AnchorButton><AnchorButton href={academyContact.phoneHref} variant="outline" leftIcon={<Phone size={18} />}>Call Now</AnchorButton></div></motion.div></Container></section>;
}
