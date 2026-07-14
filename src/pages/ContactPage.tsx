import { SEO } from "../components/common/SEO";
import { Contact } from "../components/sections/Contact";
import { FAQ } from "../components/sections/FAQ";
import { seo } from "../lib/seo";

export default function ContactPage() {
  return <><SEO {...seo.contact} /><div className="pt-20"><Contact /><FAQ /></div></>;
}
