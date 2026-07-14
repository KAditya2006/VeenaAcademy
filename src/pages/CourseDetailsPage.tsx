import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../components/common/Container";
import { SEO } from "../components/common/SEO";
import { AnchorButton } from "../components/common/Button";
import { Contact } from "../components/sections/Contact";
import { getPublicCourseBySlug, staticData, staticFallbackEnabled } from "../lib/publicApi";
import { siteUrl } from "../lib/constants";

export default function CourseDetailsPage() {
  const { slug = "" } = useParams();
  const fallback = staticFallbackEnabled ? staticData.courses.find((item) => item.slug === slug) : undefined;
  const { data, isLoading, isError } = useQuery({ queryKey: ["public-course", slug], queryFn: ({ signal }) => getPublicCourseBySlug(slug, signal), enabled: Boolean(slug) });
  const course = data ?? fallback;
  if (isLoading) return <section className="pb-20 pt-32"><Container><div className="h-96 animate-pulse rounded-token2xl bg-card" /></Container></section>;
  if (!course || (isError && !fallback)) return <section className="pb-20 pt-32"><Container><h1 className="font-display text-5xl text-primary">Course not found</h1><Link to="/courses" className="mt-6 inline-flex items-center gap-2 font-bold text-primary"><ArrowLeft size={18} /> Back to courses</Link></Container></section>;
  return <><SEO title={course.seoTitle || `${course.title} | Veena Academy`} description={course.seoDescription || course.description} canonical={`${siteUrl}/courses/${course.slug}`} jsonLd={{ "@context": "https://schema.org", "@type": "Course", name: course.title, description: course.description, provider: { "@type": "EducationalOrganization", name: "Veena Academy" } }} /><section className="bg-gradient-secondary pb-20 pt-32"><Container><Link to="/courses" className="inline-flex items-center gap-2 text-sm font-black text-primary hover:text-accent"><ArrowLeft size={18} /> All courses</Link><div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start"><div><span className="eyebrow">{course.category}</span><h1 className="mt-6 font-display text-5xl leading-tight text-text-primary sm:text-7xl">{course.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">{course.longDescription || course.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><AnchorButton href="/admission">Book Free Demo</AnchorButton><AnchorButton href="/contact" variant="secondary">Talk to Counsellor</AnchorButton></div></div><aside className="premium-card overflow-hidden p-7">{course.imageUrl ? <img src={course.imageUrl} alt={course.imageAlt || course.title} className="mb-6 aspect-video w-full rounded-tokenXl object-cover" /> : <course.icon className="text-accent" size={40} />}<h2 className="mt-6 text-2xl font-black text-primary">Course Snapshot</h2><div className="mt-5 space-y-3 text-text-secondary"><p><strong>Duration:</strong> {course.duration}</p><p><strong>Eligibility:</strong> {course.eligibility}</p></div><div className="mt-7 space-y-3">{course.outcomes.map((outcome) => <p key={outcome} className="flex items-center gap-3 font-semibold text-text-secondary"><CheckCircle2 className="text-success" size={20} /> {outcome}</p>)}</div></aside></div></Container></section><Contact /></>;
}
