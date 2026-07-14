import { Hero } from "../components/sections/Hero";
import { TrustStats } from "../components/sections/TrustStats";
import { Courses } from "../components/sections/Courses";
import { WhyChoose } from "../components/sections/WhyChoose";
import { Results } from "../components/sections/Results";
import { Faculty } from "../components/sections/Faculty";
import { Facilities } from "../components/sections/Facilities";
import { Gallery } from "../components/sections/Gallery";
import { Testimonials } from "../components/sections/Testimonials";
import { AdmissionProcess } from "../components/sections/AdmissionProcess";
import { FAQ } from "../components/sections/FAQ";
import { Contact } from "../components/sections/Contact";
import { CTASection } from "../components/sections/CTASection";
import { SEO } from "../components/common/SEO";
import { seo } from "../lib/seo";

export default function Home() {
  return <><SEO {...seo.home} /><Hero /><TrustStats /><Courses compact /><WhyChoose /><CTASection /><Results /><Faculty /><Facilities /><Gallery /><Testimonials /><AdmissionProcess /><FAQ /><Contact /></>;
}
