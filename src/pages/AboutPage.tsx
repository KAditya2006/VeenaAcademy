import { SEO } from "../components/common/SEO";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { CTASection } from "../components/sections/CTASection";
import { seo } from "../lib/seo";

export default function AboutPage() {
  return <><SEO {...seo.about} /><section className="bg-gradient-secondary pb-20 pt-32"><Container><SectionHeader badge="About" title="A premium academic environment built on trust and discipline" description="Veena Academy combines experienced teachers, structured testing, parent communication and personal mentorship to help students improve with confidence." /><div className="mt-14 grid gap-5 md:grid-cols-3"><article className="premium-card p-7"><h2 className="text-xl font-black text-primary">Mission</h2><p className="mt-3 leading-7 text-text-secondary">To provide result-oriented coaching with care, clarity and measurable progress.</p></article><article className="premium-card p-7"><h2 className="text-xl font-black text-primary">Teaching Philosophy</h2><p className="mt-3 leading-7 text-text-secondary">Concept clarity, regular practice, test review and doubt support guide every program.</p></article><article className="premium-card p-7"><h2 className="text-xl font-black text-primary">Parent Confidence</h2><p className="mt-3 leading-7 text-text-secondary">Transparent guidance, safe environment and structured counselling keep families informed.</p></article></div></Container></section><CTASection /></>;
}
