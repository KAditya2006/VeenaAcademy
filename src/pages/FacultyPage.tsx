import { SEO } from "../components/common/SEO";
import { Faculty } from "../components/sections/Faculty";
import { CTASection } from "../components/sections/CTASection";
import { seo } from "../lib/seo";

export default function FacultyPage() {
  return <><SEO {...seo.faculty} /><div className="pt-20"><Faculty /><CTASection /></div></>;
}
