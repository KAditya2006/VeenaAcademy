import { SEO } from "../components/common/SEO";
import { Results } from "../components/sections/Results";
import { Testimonials } from "../components/sections/Testimonials";
import { CTASection } from "../components/sections/CTASection";
import { seo } from "../lib/seo";

export default function ResultsPage() {
  return <><SEO {...seo.results} /><div className="pt-20"><Results /><Testimonials /><CTASection /></div></>;
}
