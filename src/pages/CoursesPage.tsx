import { Courses } from "../components/sections/Courses";
import { SEO } from "../components/common/SEO";
import { seo } from "../lib/seo";

export default function CoursesPage() {
  return <><SEO {...seo.courses} /><div className="pt-20"><Courses /></div></>;
}
