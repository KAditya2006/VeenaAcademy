import type { SEOConfig } from "../types";
import { siteUrl } from "./constants";

export const seo: Record<string, SEOConfig> = {
  home: {
    title: "Veena Academy | Premium Coaching for Boards, JEE, NEET, CUET & SSC",
    description:
      "Join Veena Academy for result-oriented coaching, expert faculty, regular tests, doubt support, library facility, transport facility, and personal mentorship.",
    canonical: siteUrl,
  },
  courses: {
    title: "Courses at Veena Academy | Boards, JEE, NEET, CUET, SSC",
    description: "Explore premium coaching programs for school, board and competitive exam preparation at Veena Academy.",
    canonical: `${siteUrl}/courses`,
  },
  about: {
    title: "About Veena Academy | Premium Coaching Institute",
    description: "Learn about Veena Academy's mission, teaching philosophy, mentorship model and student-first academic environment.",
    canonical: `${siteUrl}/about`,
  },
  faculty: {
    title: "Faculty at Veena Academy | Expert Teachers and Mentors",
    description: "Meet experienced faculty members guiding students through boards, JEE, NEET, CUET, SSC and foundation courses.",
    canonical: `${siteUrl}/faculty`,
  },
  results: {
    title: "Veena Academy Results | Toppers and Success Stories",
    description: "See student achievements, topper highlights and performance proof from Veena Academy.",
    canonical: `${siteUrl}/results`,
  },
  gallery: {
    title: "Veena Academy Gallery | Classrooms, Events and Student Life",
    description: "View classroom, event, seminar and student life moments from Veena Academy.",
    canonical: `${siteUrl}/gallery`,
  },
  contact: {
    title: "Contact Veena Academy | Book Free Demo Class",
    description: "Contact Veena Academy for admission counselling, demo class booking, course guidance and enquiries.",
    canonical: `${siteUrl}/contact`,
  },
  admission: {
    title: "Admission at Veena Academy | Book Demo and Counselling",
    description: "Start your admission enquiry at Veena Academy with counselling, demo class and batch guidance.",
    canonical: `${siteUrl}/admission`,
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Veena Academy",
  url: siteUrl,
  email: "admissions@veenaacademy.in",
  telephone: "+91 99999 99999",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road",
    addressLocality: "Your City",
    addressCountry: "IN",
  },
};
