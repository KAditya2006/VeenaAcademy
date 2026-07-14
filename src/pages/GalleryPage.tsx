import { SEO } from "../components/common/SEO";
import { Gallery } from "../components/sections/Gallery";
import { CTASection } from "../components/sections/CTASection";
import { seo } from "../lib/seo";

export default function GalleryPage() {
  return <><SEO {...seo.gallery} /><div className="pt-20"><Gallery /><CTASection /></div></>;
}
