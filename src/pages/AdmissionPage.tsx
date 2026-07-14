import { SEO } from "../components/common/SEO";
import { AdmissionProcess } from "../components/sections/AdmissionProcess";
import { Contact } from "../components/sections/Contact";
import { Courses } from "../components/sections/Courses";
import { seo } from "../lib/seo";

export default function AdmissionPage() {
  return <><SEO {...seo.admission} /><div className="pt-20"><AdmissionProcess /><Courses compact /><Contact /></div></>;
}
