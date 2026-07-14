import { ArrowRight, BookOpenCheck, MessageCircle, Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnchorButton } from "../common/Button";
import { Container } from "../common/Container";
import { courses } from "../../data/courses";
import { academyContact } from "../../lib/constants";
import { fadeUp, scaleIn } from "../../lib/animations";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-card pt-28">
      <div className="absolute inset-0 -z-10 bg-hero-radial" />
      <Container className="grid min-h-[calc(100vh-112px)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <span className="eyebrow"><Sparkles size={15} /> Admissions Open 2026-27</span>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-normal leading-tight text-text-primary sm:text-7xl lg:text-8xl">Empowering Students to Achieve Excellence</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">Result-oriented coaching for Boards, JEE, NEET, CUET, SSC and Foundation courses.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <AnchorButton href="/admission" rightIcon={<ArrowRight size={18} />}>Book Free Demo</AnchorButton>
            <AnchorButton href={academyContact.phoneHref} variant="secondary" leftIcon={<Phone size={18} />}>Call Now</AnchorButton>
            <AnchorButton href={academyContact.whatsappHref} variant="secondary" leftIcon={<MessageCircle size={18} />}>WhatsApp</AnchorButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {courses.slice(4, 9).map((course) => <Link key={course.id} to={`/courses/${course.slug}`} className="rounded-tokenPill border border-border bg-card px-4 py-2 text-sm font-bold text-primary shadow-level1 transition hover:bg-accent-light">{course.title.replace(" Preparation", "")}</Link>)}
          </div>
        </motion.div>
        <motion.div variants={scaleIn} initial="hidden" animate="visible" className="premium-card relative overflow-hidden p-5 sm:p-7">
          <div className="rounded-tokenXl bg-gradient-primary p-6 text-text-inverse sm:p-8">
            <div className="flex items-center justify-between gap-5">
              <div><p className="text-sm font-bold text-accent-light">Premium Learning Space</p><h2 className="mt-2 font-display text-3xl font-normal">Focused batches. Personal mentoring.</h2></div>
              <BookOpenCheck className="text-accent-light" size={36} />
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Live Classes", "Tests", "Doubts"].map((item) => <div key={item} className="rounded-tokenXl bg-card/12 p-4 text-center backdrop-blur"><p className="text-xs font-bold uppercase tracking-wider text-primary-light">{item}</p></div>)}
            </div>
            <div className="mt-8 aspect-[4/3] rounded-tokenXl bg-gradient-to-br from-background/95 to-primary-light/70 p-5 text-primary shadow-level3" aria-label="Student classroom illustration placeholder">
              <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-4">
                <div className="flex flex-col justify-end gap-3"><div className="h-28 rounded-t-full bg-accent-light" /><div className="h-16 rounded-tokenXl bg-accent" /></div>
                <div className="space-y-4 rounded-token2xl bg-card p-5 shadow-level2"><div className="h-3 w-28 rounded-tokenPill bg-primary/20" /><div className="h-3 w-full rounded-tokenPill bg-accent-light" /><div className="h-3 w-3/4 rounded-tokenPill bg-primary-light" /><div className="mt-8 grid grid-cols-2 gap-3"><div className="h-20 rounded-tokenXl bg-primary-light" /><div className="h-20 rounded-tokenXl bg-accent-light" /></div></div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
