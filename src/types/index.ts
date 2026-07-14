import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string };
export type CourseCategory = "School" | "Competitive Exam" | "Commerce" | "Scholarship";

export type Course = {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  description: string;
  duration: string;
  eligibility: string;
  icon: LucideIcon;
  cta: string;
  outcomes: string[];
  imageUrl?: string;
  imageAlt?: string;
  longDescription?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type FacultyMember = {
  id: string;
  name: string;
  subject: string;
  experience: string;
  qualification: string;
  initials: string;
  photoUrl?: string;
};

export type Result = {
  id: string;
  name: string;
  achievement: string;
  score: string;
  detail: string;
  initials: string;
  photoUrl?: string;
};

export type Stat = { id: string; value: number; suffix: string; label: string; description: string; icon: LucideIcon };
export type Facility = { id: string; title: string; description: string; icon: LucideIcon };

export type GalleryItem = {
  id: string;
  title: string;
  category: "Classroom" | "Events" | "Students" | "Seminars";
  tone: string;
  height: string;
  imageUrl?: string;
  altText?: string;
};

export type Testimonial = { id: string; quote: string; name: string; role: string; rating: number; type: "Student" | "Parent" };
export type FAQItem = { id: string; question: string; answer: string; category: "Admission" | "Courses" | "Facilities" | "Tests" | "Contact" };
export type SEOConfig = { title: string; description: string; canonical?: string };
